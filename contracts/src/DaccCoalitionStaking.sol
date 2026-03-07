// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title d/acc Coalition Staking
/// @notice Stake ETH to signal interest in d/acc domains.
///         Users can withdraw their own stake at any time before the operator deploys funds.
///         The operator (0x00De4B13153673BCAE2616b67bf822500d325Fc3) can withdraw a domain's
///         pooled funds to a wallet of their choice once it reaches 1 ETH.
/// @dev Intentionally simple — no upgradability, no external calls except ETH transfers.
contract DaccCoalitionStaking {
    // ── State ────────────────────────────────────────────────────────────
    address public immutable operator;
    uint256 public constant OPERATOR_THRESHOLD = 1 ether;

    /// @dev domainHash => staker => amount
    mapping(bytes32 => mapping(address => uint256)) public stakes;

    /// @dev domainHash => total staked ETH
    mapping(bytes32 => uint256) public domainTotals;

    /// @dev domainHash => true once operator has withdrawn (funds deployed)
    mapping(bytes32 => bool) public domainDeployed;

    // ── Events ───────────────────────────────────────────────────────────
    event Staked(
        bytes32 indexed domainHash,
        string domainId,
        address indexed staker,
        uint256 amount
    );

    event Withdrawn(
        bytes32 indexed domainHash,
        string domainId,
        address indexed staker,
        uint256 amount
    );

    event OperatorWithdrawn(
        bytes32 indexed domainHash,
        string domainId,
        address indexed to,
        uint256 amount
    );

    // ── Errors ───────────────────────────────────────────────────────────
    error ZeroAmount();
    error InsufficientStake();
    error DomainAlreadyDeployed();
    error BelowThreshold();
    error NotOperator();
    error TransferFailed();

    // ── Constructor ──────────────────────────────────────────────────────
    constructor(address _operator) {
        operator = _operator;
    }

    // ── Public functions ─────────────────────────────────────────────────

    /// @notice Stake ETH toward a domain. Marks your interest with skin in the game.
    /// @param domainId Human-readable domain identifier (e.g. "zero-knowledge-systems")
    function stake(string calldata domainId) external payable {
        if (msg.value == 0) revert ZeroAmount();
        bytes32 hash = _hash(domainId);
        if (domainDeployed[hash]) revert DomainAlreadyDeployed();

        stakes[hash][msg.sender] += msg.value;
        domainTotals[hash] += msg.value;

        emit Staked(hash, domainId, msg.sender, msg.value);
    }

    /// @notice Withdraw your own stake from a domain. Only works before operator deploys.
    /// @param domainId The domain to withdraw from
    /// @param amount Wei to withdraw
    function withdraw(string calldata domainId, uint256 amount) external {
        if (amount == 0) revert ZeroAmount();
        bytes32 hash = _hash(domainId);
        if (domainDeployed[hash]) revert DomainAlreadyDeployed();
        if (stakes[hash][msg.sender] < amount) revert InsufficientStake();

        stakes[hash][msg.sender] -= amount;
        domainTotals[hash] -= amount;

        (bool ok, ) = msg.sender.call{value: amount}("");
        if (!ok) revert TransferFailed();

        emit Withdrawn(hash, domainId, msg.sender, amount);
    }

    /// @notice Operator withdraws a domain's pooled funds once threshold is met.
    ///         This marks the domain as "deployed" — individual withdrawals are no longer possible.
    /// @param domainId The domain to deploy
    /// @param to Destination wallet for the pooled funds
    function operatorWithdraw(string calldata domainId, address to) external {
        if (msg.sender != operator) revert NotOperator();
        bytes32 hash = _hash(domainId);
        if (domainDeployed[hash]) revert DomainAlreadyDeployed();

        uint256 total = domainTotals[hash];
        if (total < OPERATOR_THRESHOLD) revert BelowThreshold();

        domainDeployed[hash] = true;

        (bool ok, ) = to.call{value: total}("");
        if (!ok) revert TransferFailed();

        emit OperatorWithdrawn(hash, domainId, to, total);
    }

    // ── View functions ───────────────────────────────────────────────────

    /// @notice Get a user's stake in a domain
    function getStake(string calldata domainId, address staker) external view returns (uint256) {
        return stakes[_hash(domainId)][staker];
    }

    /// @notice Get total staked in a domain
    function getDomainTotal(string calldata domainId) external view returns (uint256) {
        return domainTotals[_hash(domainId)];
    }

    /// @notice Check if a domain's funds have been deployed by the operator
    function isDomainDeployed(string calldata domainId) external view returns (bool) {
        return domainDeployed[_hash(domainId)];
    }

    // ── Internal ─────────────────────────────────────────────────────────

    function _hash(string calldata domainId) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked(domainId));
    }
}
