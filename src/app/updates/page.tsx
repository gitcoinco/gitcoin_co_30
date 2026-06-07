Get the current profile's case studies
const getCaseStudies = useCallback(() => {
  setProfile(fetchProfile());
}, []);

// Get the current profile's research
const getResearch = useCallback(() => {
  setProfile(fetchProfile());
}, []);

// Get the current profile's campaigns
const getCampaigns = useCallback(() => {
  setProfile(fetchProfile());
}, []);

export default function App() {
  // Initial state for the profile
  const [profileData, setProfileData] = useState<AppProfile | null>(null);
  const [caseStudies, setCaseStudies] = useState([]);
  const [research, setResearch] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  
  useEffect(() => {
    updateProfile();
  }, []);

  // Get case studies from the profile
  useEffect(() => {
    if (profileData) {
      setCaseStudies(profileData.caseStudies);
    }
  }, [profileData]);

  // Get research from the profile
  useEffect(() => {
    if (profileData) {
      setResearch(profileData.research);
    }
  }, [profileData]);

  // Get campaigns from the profile
  useEffect(() => {
    if (profileData) {
      setCampaigns(profileData.campaigns);
    }
  }, [profileData]);

  // Get the current profile's image
  const getProfileImage = useCallback(() => {
    return profileData?.campaigns[0]?.image ||