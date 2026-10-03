import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppQuery, useFeaturedAppMutation } from '@/hooks/useApps';
import { AppType } from '@/types';
import AppCard from '@/components/AppCard';
import AppGallery from '@/components/AppGallery';
import RelatedApps from '@/components/RelatedApps';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  ExternalLink, 
  Heart, 
  Star, 
  Share2, 
  Flag,
  Trophy,
  Users,
  Tag,
  CheckCircle2,
  Circle
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AppDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: app, isLoading, error } = useAppQuery(slug!);
  const featureApp = useFeaturedAppMutation();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "App não encontrado",
        description: "O app que você procura não existe ou foi removido.",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Carregando app...</p>
        </div>
      </div>
    );
  }

  if (!app || error) {
    return null;
  }

  const handleFeatureToggle = async () => {
    try {
      await featureApp.mutateAsync({ appId: app.id, featured: !app.featured });
      toast({
        title: app.featured ? "App desfeatureado" : "App featureado!",
        description: app.featured 
          ? "O app foi removido do destaque." 
          : "O app agora aparece em destaque na home!",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível atualizar o status do app.",
      });
    }
  };

  const handleLike = () => {
    toast({
      title: "App curtido!",
      description: "Você curtiu este app. Ele aparecerá nos seus favoritos.",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copiado!",
      description: "O link do app foi copiado para a área de transferência.",
    });
  };

  const handleReport = () => {
    toast({
      title: "App sinalizado",
      description: "Obrigado por nos ajudar a manter a qualidade. Analisaremos o app.",
    });
  };

  const handleApply = () => {
    toast({
      title: "Inscrição enviada!",
      description: "Sua candidatura foi registrada. Aguarde a avaliação.",
    });
  };

  const relatedApps: AppType[] = [];
  const relatedMechanismApps: AppType[] = [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50 sticky top-16 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden flex-shrink-0">
              {app.logo ? (
                <img src={app.logo} alt={app.name} className="w-full h-full object-cover" />
              ) : (
                <Code className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{app.name}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>@{app.slug}</span>
                {app.featured && (
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    <Trophy className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleReport}>
              <Flag className="w-4 h-4 mr-2" />
              Report
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Banner Image */}
            {app.bannerImage && (
              <div className="rounded-xl overflow-hidden border bg-card">
                <img 
                  src={app.bannerImage} 
                  alt={`${app.name} banner`}
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {app.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <div 
                className="text-foreground"
                dangerouslySetInnerHTML={{ __html: app.description }} 
              />
            </div>

            {/* Gallery */}
            <AppGallery images={app.images} appName={app.name} />

            {/* About Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">About {app.name}</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div 
                  dangerouslySetInnerHTML={{ __html: app.about || '' }} 
                />
              </div>
            </section>

            {/* Authors */}
            {app.authors && app.authors.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">Authors</h2>
                <div className="space-y-3">
                  {app.authors.map((author, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                      {author.avatar ? (
                        <img 
                          src={author.avatar} 
                          alt={author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <Users className="w-5 h-5 text-muted-foreground" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground">{author.name}</p>
                        <a 
                          href={author.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          GitHub <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Related Apps */}
            <RelatedApps 
              apps={relatedApps} 
              mechanismApps={relatedMechanismApps} 
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions Card */}
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
                  {app.logo ? (
                    <img src={app.logo} alt={app.name} className="w-full h-full object-cover" />
                  ) : (
                    <Code className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-xl text-foreground">{app.name}</h2>
                  <p className="text-sm text-muted-foreground">{app.category}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button 
                  className="gap-2"
                  onClick={handleLike}
                >
                  <Heart className={`w-4 h-4 ${app.liked ? 'fill-current' : ''}`} />
                  {app.liked ? 'Liked' : 'Like'}
                </Button>
                <Button 
                  variant="outline"
                  className="gap-2"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>

              {app.githubUrl && (
                <Button 
                  className="w-full gap-2"
                  asChild
                >
                  <a href={app.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Code className="w-4 h-4" />
                    View on GitHub
                  </a>
                </Button>
              )}

              {app.website && (
                <Button 
                  variant="outline"
                  className="w-full gap-2"
                  asChild
                >
                  <a href={app.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Website
                  </a>
                </Button>
              )}

              <Button 
                variant="secondary"
                className="w-full gap-2"
                onClick={handleFeatureToggle}
                disabled={featureApp.isPending}
              >
                <Star className={`w-4 h-4 ${app.featured ? 'fill-current' : ''}`} />
                {app.featured ? 'Remove from Featured' : 'Feature this App'}
              </Button>
            </div>

            {/* Metadata Card */}
            <div className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-4">App Details</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Created</dt>
                  <dd className="text-foreground font-medium">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Last Updated</dt>
                  <dd className="text-foreground font-medium">
                    {new Date(app.updatedAt).toLocaleDateString()}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Status</dt>
                  <dd className="text-foreground font-medium capitalize">
                    {app.status.toLowerCase().replace(/\s+/g, '-')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="text-foreground font-medium">{app.category}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Slug</dt>
                  <dd className="text-foreground font-mono text-xs">{app.slug}</dd>
                </div>
              </dl>
            </div>

            {/* Blockchain Info */}
            {app.blockchains && app.blockchains.length > 0 && (
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Supported Blockchains</h3>
                <div className="flex flex-wrap gap-2">
                  {app.blockchains.map((chain) => (
                    <Badge key={chain} variant="outline" className="px-3 py-1">
                      {chain}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {app.socialLinks && Object.entries(app.socialLinks).length > 0 && (
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Social Links</h3>
                <div className="space-y-2">
                  {Object.entries(app.socialLinks).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Checklist */}
            {app.submissionChecklist && (
              <div className="rounded-xl border bg-card p-6">
                <h3 className="font-semibold text-foreground mb-4">Submission Checklist</h3>
                <div className="space-y-2">
                  {app.submissionChecklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDetail;
