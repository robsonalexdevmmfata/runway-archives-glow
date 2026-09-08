import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogOut, Settings, Image, Palette, FileText, Home, LayoutDashboard, Plus, Trash2, Edit, Download, Upload, RefreshCw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdminStore } from "@/lib/admin-store";
import type { Nominee } from "@/lib/vs-data";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const adminStore = useAdminStore();

  useEffect(() => {
    const session = localStorage.getItem("admin_session");
    const adminUser = localStorage.getItem("admin_user");
    
    if (session !== "true" || !adminUser) {
      navigate({ to: "/admin/login" });
      return;
    }
    
    setUser(adminUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    localStorage.removeItem("admin_user");
    navigate({ to: "/admin/login" });
  };

  const menuItems = [
    { id: "overview", icon: LayoutDashboard, label: "Visão Geral" },
    { id: "categories", icon: Image, label: "Categorias" },
    { id: "site-config", icon: Settings, label: "Configurações" },
    { id: "colors", icon: Palette, label: "Cores e Tema" },
    { id: "content", icon: FileText, label: "Conteúdo" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-panel border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-primary rounded-lg flex items-center justify-center shadow-lg">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display text-lg text-gold">Admin Panel</h2>
              <p className="text-xs text-muted-foreground">Runway Wavy</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                  ${isActive 
                    ? "bg-pink-500/15 text-pink-400 shadow-[inset_3px_0_0_0_rgba(236,72,153,0.8)]" 
                    : "text-muted-foreground hover:bg-pink-500/10 hover:text-pink-300"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-gold to-accent rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-background">{user.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{user}</p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="hover:bg-destructive/10 hover:text-destructive"
              title="Sair"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 bg-panel border-b border-border px-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display text-gold">
              {menuItems.find(m => m.id === activeSection)?.label || "Dashboard"}
            </h1>
            <p className="text-xs text-muted-foreground">Gerencie todo o conteúdo do seu site</p>
          </div>
          <Button
            variant="outline"
            className="border-pink-500/30 hover:bg-pink-500/10 hover:border-pink-400"
            onClick={() => window.open("/", "_blank")}
          >
            <Home className="w-4 h-4 mr-2" />
            Ver Site
          </Button>
        </header>

        <div className="p-8">
          {activeSection === "overview" && <OverviewSection adminStore={adminStore} />}
          {activeSection === "categories" && <CategoriesSection adminStore={adminStore} />}
          {activeSection === "site-config" && <SiteConfigSection adminStore={adminStore} />}
          {activeSection === "colors" && <ColorsSection adminStore={adminStore} />}
          {activeSection === "content" && <ContentSection adminStore={adminStore} />}
        </div>
      </main>
    </div>
  );
}

// Seção: Visão Geral
function OverviewSection({ adminStore }: { adminStore: ReturnType<typeof useAdminStore> }) {
  const totalNominees = adminStore.categories.reduce((acc, cat) => acc + cat.nominees.length, 0);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-pink-500/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Categorias</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display text-gold">{adminStore.categories.length}</p>
          </CardContent>
        </Card>
        <Card className="border-pink-500/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Nominees</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display text-gold">{totalNominees}</p>
          </CardContent>
        </Card>
        <Card className="border-pink-500/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">Última Atualização</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-display text-gold">Hoje</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-display text-gold">Bem-vindo ao Painel Admin!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Use o menu lateral para navegar entre as diferentes seções e editar o conteúdo do site.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✨ <strong className="text-foreground">Categorias:</strong> Adicione, edite e remova nominees, fotos, vídeos e textos</li>
            <li>⚙️ <strong className="text-foreground">Configurações:</strong> Personalize nome, logo, header e footer do site</li>
            <li>🎨 <strong className="text-foreground">Cores:</strong> Customize o tema e paleta de cores</li>
            <li>📝 <strong className="text-foreground">Conteúdo:</strong> Exporte backups e restaure dados padrão</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// Seção: Categorias
function CategoriesSection({ adminStore }: { adminStore: ReturnType<typeof useAdminStore> }) {
  const [selectedCategory, setSelectedCategory] = useState(adminStore.categories[0]?.slug || "");
  const [editingNominee, setEditingNominee] = useState<{ index: number; data: Nominee } | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const category = adminStore.categories.find(c => c.slug === selectedCategory);

  const handleSaveNominee = (nominee: Nominee, index?: number) => {
    if (index !== undefined) {
      adminStore.updateNominee(selectedCategory, index, nominee);
    } else {
      adminStore.addNominee(selectedCategory, nominee);
    }
    setEditingNominee(null);
    setIsAddingNew(false);
  };

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-display text-gold">Selecione uma Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {adminStore.categories.map(cat => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {category && (
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-display text-gold">{category.title}</CardTitle>
              <CardDescription>{category.kicker}</CardDescription>
            </div>
            <Button 
              onClick={() => setIsAddingNew(true)}
              className="bg-pink-500 hover:bg-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Nominee
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.nominees.map((nominee, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-panel rounded-lg border border-pink-500/20">
                  <div className="flex items-center gap-4">
                    <img src={nominee.img} alt={nominee.name} className="w-16 h-24 object-cover rounded" />
                    <div>
                      <h3 className="font-display text-lg text-gold">{nominee.name}</h3>
                      <p className="text-sm text-muted-foreground">{nominee.sub}</p>
                      <p className="text-xs text-pink-400 mt-1">Rank: {nominee.rank}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingNominee({ index: idx, data: nominee })}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        if (confirm(`Deletar ${nominee.name}?`)) {
                          adminStore.deleteNominee(selectedCategory, idx);
                        }
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dialog para editar/adicionar nominee */}
      <NomineeDialog
        open={editingNominee !== null || isAddingNew}
        onClose={() => {
          setEditingNominee(null);
          setIsAddingNew(false);
        }}
        nominee={editingNominee?.data}
        onSave={(nominee) => handleSaveNominee(nominee, editingNominee?.index)}
      />
    </div>
  );
}

// Dialog para editar Nominee
function NomineeDialog({ 
  open, 
  onClose, 
  nominee, 
  onSave 
}: { 
  open: boolean; 
  onClose: () => void; 
  nominee?: Nominee;
  onSave: (nominee: Nominee) => void;
}) {
  const [formData, setFormData] = useState<Nominee>(
    nominee || { name: "", sub: "", img: "", rank: "1º", videoUrl: "", details: "", gallery: [] }
  );
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  useEffect(() => {
    if (nominee) {
      setFormData(nominee);
      setImagePreview(nominee.img);
      setVideoPreview(nominee.videoUrl || "");
    } else {
      setFormData({ name: "", sub: "", img: "", rank: "1º", videoUrl: "", details: "", gallery: [] });
      setImagePreview("");
      setVideoPreview("");
    }
  }, [nominee, open]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Verificar se é imagem
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      setFormData({ ...formData, img: result });
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUrlChange = (url: string) => {
    setFormData({ ...formData, videoUrl: url });
    
    // Extrair ID do YouTube e criar embed URL
    let embedUrl = "";
    if (url) {
      // Suporta vários formatos de URL do YouTube
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\/\s]+)/,
        /youtube\.com\/shorts\/([^&?\/\s]+)/
      ];
      
      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
          embedUrl = `https://www.youtube.com/embed/${match[1]}`;
          break;
        }
      }
      
      // Se já for embed URL, usar direto
      if (url.includes('youtube.com/embed/')) {
        embedUrl = url;
      }
    }
    
    setVideoPreview(embedUrl);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-gold">
            {nominee ? "Editar Nominee" : "Adicionar Nominee"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sub">Subtítulo</Label>
            <Input
              id="sub"
              value={formData.sub}
              onChange={(e) => setFormData({ ...formData, sub: e.target.value })}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Imagem</Label>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  id="img"
                  value={formData.img}
                  onChange={(e) => {
                    setFormData({ ...formData, img: e.target.value });
                    setImagePreview(e.target.value);
                  }}
                  placeholder="/assets/model-1.jpg ou cole URL"
                />
              </div>
              <div>
                <Label htmlFor="img-upload" className="cursor-pointer">
                  <div className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-md flex items-center gap-2 transition-colors">
                    <Upload className="w-4 h-4" />
                    Upload
                  </div>
                </Label>
                <Input
                  id="img-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            {/* Preview da Imagem */}
            {imagePreview && (
              <div className="mt-3 border border-pink-500/30 rounded-lg overflow-hidden">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="w-full h-48 object-cover"
                  onError={() => setImagePreview("")}
                />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="rank">Rank</Label>
            <Select value={formData.rank} onValueChange={(val) => setFormData({ ...formData, rank: val })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1º">1º</SelectItem>
                <SelectItem value="2º">2º</SelectItem>
                <SelectItem value="3º">3º</SelectItem>
                <SelectItem value="4º">4º</SelectItem>
                <SelectItem value="5º">5º</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="videoUrl">URL do Vídeo do YouTube (opcional)</Label>
            <Input
              id="videoUrl"
              value={formData.videoUrl || ""}
              onChange={(e) => handleVideoUrlChange(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... ou youtu.be/..."
            />
            <p className="text-xs text-muted-foreground">
              Cole qualquer link do YouTube (watch, shorts, youtu.be)
            </p>
            {/* Preview do Vídeo */}
            {videoPreview && (
              <div className="mt-3 border border-pink-500/30 rounded-lg overflow-hidden">
                <div className="relative aspect-video">
                  <iframe
                    src={videoPreview}
                    title="Preview do Vídeo"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="details">Detalhes (opcional)</Label>
            <Textarea
              id="details"
              value={formData.details || ""}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              rows={4}
              placeholder="Descrição completa do nominee..."
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1 bg-pink-500 hover:bg-pink-600">
              Salvar
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Seção: Configurações do Site
function SiteConfigSection({ adminStore }: { adminStore: ReturnType<typeof useAdminStore> }) {
  const [config, setConfig] = useState(adminStore.siteConfig);

  const handleSave = () => {
    adminStore.updateSiteConfig(config);
    alert("Configurações salvas com sucesso!");
  };

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle className="text-lg font-display text-gold">Configurações do Site</CardTitle>
        <CardDescription>Personalize nome, logo, header e footer</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Nome do Site</Label>
          <Input
            value={config.siteName}
            onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Tagline</Label>
          <Input
            value={config.siteTagline}
            onChange={(e) => setConfig({ ...config, siteTagline: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Texto do Logo</Label>
          <Input
            value={config.logoText}
            onChange={(e) => setConfig({ ...config, logoText: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label>Texto do Rodapé</Label>
          <Textarea
            value={config.footerText}
            onChange={(e) => setConfig({ ...config, footerText: e.target.value })}
            rows={3}
          />
        </div>
        <Button onClick={handleSave} className="w-full bg-pink-500 hover:bg-pink-600">
          Salvar Configurações
        </Button>
      </CardContent>
    </Card>
  );
}

// Seção: Cores
function ColorsSection({ adminStore }: { adminStore: ReturnType<typeof useAdminStore> }) {
  const [colors, setColors] = useState(adminStore.siteConfig.colors);
  const [activeTab, setActiveTab] = useState<"principais" | "surfaces" | "texto" | "components">("principais");

  const handleSave = () => {
    adminStore.updateSiteConfig({ colors });
    alert("Cores salvas com sucesso! Recarregue a página para ver as mudanças.");
  };

  const handleReset = () => {
    if (confirm("Resetar todas as cores para o padrão?")) {
      const defaultColors = {
        primary: "oklch(0.7 0.25 350)",
        secondary: "oklch(0.65 0.2 280)",
        accent: "oklch(0.82 0.15 85)",
        gold: "oklch(0.85 0.12 85)",
        goldSoft: "oklch(0.82 0.09 80)",
        pinkGlow: "oklch(0.75 0.28 350)",
        pinkHover: "oklch(0.7 0.25 350)",
        background: "oklch(0.15 0.01 270)",
        panel: "oklch(0.18 0.01 270)",
        card: "oklch(0.20 0.01 270)",
        sidebar: "oklch(0.17 0.01 270)",
        foreground: "oklch(0.98 0 0)",
        muted: "oklch(0.65 0.01 270)",
        border: "oklch(0.30 0.02 270)",
        headerBg: "oklch(0.7 0.25 350)",
        headerText: "oklch(0.98 0 0)",
        footerBg: "oklch(0.18 0.01 270)",
        footerText: "oklch(0.65 0.01 270)",
        buttonPrimary: "oklch(0.7 0.25 350)",
        buttonSecondary: "oklch(0.85 0.12 85)",
        buttonHover: "oklch(0.65 0.28 350)",
        success: "oklch(0.65 0.2 145)",
        warning: "oklch(0.75 0.15 85)",
        error: "oklch(0.65 0.25 25)",
        info: "oklch(0.65 0.2 240)",
      };
      setColors(defaultColors);
    }
  };

  const tabs = [
    { id: "principais" as const, label: "Cores Principais", icon: Palette },
    { id: "surfaces" as const, label: "Superfícies & BG", icon: LayoutDashboard },
    { id: "texto" as const, label: "Texto & Bordas", icon: FileText },
    { id: "components" as const, label: "Componentes", icon: Settings },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-display text-gold">Editor de Cores e Tema</CardTitle>
          <CardDescription>Personalize todas as cores do site - estilo WordPress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-border pb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${activeTab === tab.id
                      ? "bg-pink-500 text-white"
                      : "bg-panel text-muted-foreground hover:bg-pink-500/10 hover:text-pink-300"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Cores Principais */}
          {activeTab === "principais" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorPicker
                label="Cor Primária"
                description="Cor principal do site (rosa/pink)"
                value={colors.primary}
                onChange={(val) => setColors({ ...colors, primary: val })}
              />
              <ColorPicker
                label="Cor Secundária"
                description="Cor secundária"
                value={colors.secondary}
                onChange={(val) => setColors({ ...colors, secondary: val })}
              />
              <ColorPicker
                label="Cor de Destaque"
                description="Cor de destaque/accent"
                value={colors.accent}
                onChange={(val) => setColors({ ...colors, accent: val })}
              />
              <ColorPicker
                label="Dourado Principal"
                description="Cor dourada da marca"
                value={colors.gold}
                onChange={(val) => setColors({ ...colors, gold: val })}
              />
              <ColorPicker
                label="Dourado Suave"
                description="Dourado mais claro"
                value={colors.goldSoft}
                onChange={(val) => setColors({ ...colors, goldSoft: val })}
              />
              <ColorPicker
                label="Rosa Neon"
                description="Rosa brilhante (glow)"
                value={colors.pinkGlow}
                onChange={(val) => setColors({ ...colors, pinkGlow: val })}
              />
              <ColorPicker
                label="Rosa Hover"
                description="Rosa para hover/interação"
                value={colors.pinkHover}
                onChange={(val) => setColors({ ...colors, pinkHover: val })}
              />
            </div>
          )}

          {/* Superfícies & Backgrounds */}
          {activeTab === "surfaces" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorPicker
                label="Background Principal"
                description="Fundo do site"
                value={colors.background}
                onChange={(val) => setColors({ ...colors, background: val })}
              />
              <ColorPicker
                label="Painel"
                description="Cor dos painéis"
                value={colors.panel}
                onChange={(val) => setColors({ ...colors, panel: val })}
              />
              <ColorPicker
                label="Cards"
                description="Fundo dos cards"
                value={colors.card}
                onChange={(val) => setColors({ ...colors, card: val })}
              />
              <ColorPicker
                label="Sidebar"
                description="Fundo da barra lateral"
                value={colors.sidebar}
                onChange={(val) => setColors({ ...colors, sidebar: val })}
              />
              <ColorPicker
                label="Header - Fundo"
                description="Cor de fundo do cabeçalho"
                value={colors.headerBg}
                onChange={(val) => setColors({ ...colors, headerBg: val })}
              />
              <ColorPicker
                label="Header - Texto"
                description="Cor do texto do cabeçalho"
                value={colors.headerText}
                onChange={(val) => setColors({ ...colors, headerText: val })}
              />
              <ColorPicker
                label="Footer - Fundo"
                description="Cor de fundo do rodapé"
                value={colors.footerBg}
                onChange={(val) => setColors({ ...colors, footerBg: val })}
              />
              <ColorPicker
                label="Footer - Texto"
                description="Cor do texto do rodapé"
                value={colors.footerText}
                onChange={(val) => setColors({ ...colors, footerText: val })}
              />
            </div>
          )}

          {/* Texto & Bordas */}
          {activeTab === "texto" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorPicker
                label="Texto Principal"
                description="Cor do texto principal"
                value={colors.foreground}
                onChange={(val) => setColors({ ...colors, foreground: val })}
              />
              <ColorPicker
                label="Texto Muted"
                description="Texto secundário/esmaecido"
                value={colors.muted}
                onChange={(val) => setColors({ ...colors, muted: val })}
              />
              <ColorPicker
                label="Bordas"
                description="Cor das bordas"
                value={colors.border}
                onChange={(val) => setColors({ ...colors, border: val })}
              />
            </div>
          )}

          {/* Componentes & Estados */}
          {activeTab === "components" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ColorPicker
                label="Botão Primário"
                description="Cor dos botões principais"
                value={colors.buttonPrimary}
                onChange={(val) => setColors({ ...colors, buttonPrimary: val })}
              />
              <ColorPicker
                label="Botão Secundário"
                description="Cor dos botões secundários"
                value={colors.buttonSecondary}
                onChange={(val) => setColors({ ...colors, buttonSecondary: val })}
              />
              <ColorPicker
                label="Botão Hover"
                description="Cor hover dos botões"
                value={colors.buttonHover}
                onChange={(val) => setColors({ ...colors, buttonHover: val })}
              />
              <ColorPicker
                label="Sucesso"
                description="Cor de sucesso (verde)"
                value={colors.success}
                onChange={(val) => setColors({ ...colors, success: val })}
              />
              <ColorPicker
                label="Aviso"
                description="Cor de aviso (amarelo)"
                value={colors.warning}
                onChange={(val) => setColors({ ...colors, warning: val })}
              />
              <ColorPicker
                label="Erro"
                description="Cor de erro (vermelho)"
                value={colors.error}
                onChange={(val) => setColors({ ...colors, error: val })}
              />
              <ColorPicker
                label="Informação"
                description="Cor de informação (azul)"
                value={colors.info}
                onChange={(val) => setColors({ ...colors, info: val })}
              />
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex gap-3 pt-6 border-t border-border">
            <Button onClick={handleSave} className="flex-1 bg-pink-500 hover:bg-pink-600">
              <Download className="w-4 h-4 mr-2" />
              Salvar Todas as Cores
            </Button>
            <Button onClick={handleReset} variant="outline" className="border-pink-500/30">
              <RefreshCw className="w-4 h-4 mr-2" />
              Resetar Padrão
            </Button>
          </div>

          {/* Info */}
          <div className="bg-panel p-4 rounded-lg border border-pink-500/20">
            <p className="text-sm text-muted-foreground">
              💡 <strong className="text-foreground">Dica:</strong> Use o formato{" "}
              <code className="text-pink-400 bg-background px-2 py-1 rounded">oklch(L C H)</code> para cores.
              Exemplo: <code className="text-pink-400 bg-background px-2 py-1 rounded">oklch(0.7 0.25 350)</code>
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              L = Luminosidade (0-1) | C = Chroma/saturação (0-0.4) | H = Matiz/hue (0-360)
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente ColorPicker
function ColorPicker({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-foreground">{label}</Label>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
        <div
          className="w-12 h-12 rounded-lg border-2 border-border shadow-lg"
          style={{ background: value }}
        />
      </div>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="oklch(0.7 0.25 350)"
        className="font-mono text-sm"
      />
    </div>
  );
}

// Seção: Conteúdo (Export/Import/Reset + Editor de Conteúdos)
function ContentSection({ adminStore }: { adminStore: ReturnType<typeof useAdminStore> }) {
  const [activeTab, setActiveTab] = useState<"hero" | "ticker" | "stats" | "stories" | "backup">("hero");
  const [editingTickerIndex, setEditingTickerIndex] = useState<number | null>(null);
  const [editingStatIndex, setEditingStatIndex] = useState<number | null>(null);

  const handleExport = () => {
    const data = adminStore.exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `runway-wavy-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = adminStore.importData(content);
      if (success) {
        alert("Dados importados com sucesso!");
      } else {
        alert("Erro ao importar dados!");
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm("Isso irá resetar TODOS os dados para o padrão. Deseja continuar?")) {
      adminStore.resetToDefaults();
      alert("Dados resetados com sucesso!");
    }
  };

  const tabs = [
    { id: "hero" as const, label: "Hero Section", icon: LayoutDashboard },
    { id: "ticker" as const, label: "Ticker/Ranking", icon: Trophy },
    { id: "stats" as const, label: "Estatísticas", icon: FileText },
    { id: "stories" as const, label: "Stories/Categorias", icon: Image },
    { id: "backup" as const, label: "Backup/Reset", icon: Download },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-display text-gold">Editor de Conteúdo</CardTitle>
          <CardDescription>Edite todos os textos e conteúdos do site</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border pb-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm
                    ${activeTab === tab.id
                      ? "bg-pink-500 text-white"
                      : "bg-panel text-muted-foreground hover:bg-pink-500/10 hover:text-pink-300"
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Hero Section Editor */}
          {activeTab === "hero" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Texto Superior</Label>
                <Input
                  value={adminStore.siteConfig.heroSection.topText}
                  onChange={(e) =>
                    adminStore.updateSiteConfig({
                      heroSection: { ...adminStore.siteConfig.heroSection, topText: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Título Principal</Label>
                <Input
                  value={adminStore.siteConfig.heroSection.mainTitle}
                  onChange={(e) =>
                    adminStore.updateSiteConfig({
                      heroSection: { ...adminStore.siteConfig.heroSection, mainTitle: e.target.value },
                    })
                  }
                  className="text-2xl font-display"
                />
              </div>
              <div className="space-y-2">
                <Label>Texto Inferior</Label>
                <Input
                  value={adminStore.siteConfig.heroSection.bottomText}
                  onChange={(e) =>
                    adminStore.updateSiteConfig({
                      heroSection: { ...adminStore.siteConfig.heroSection, bottomText: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>URL da Imagem de Fundo</Label>
                <Input
                  value={adminStore.siteConfig.heroSection.backgroundImage}
                  onChange={(e) =>
                    adminStore.updateSiteConfig({
                      heroSection: { ...adminStore.siteConfig.heroSection, backgroundImage: e.target.value },
                    })
                  }
                  placeholder="/assets/hero-runway.jpg"
                />
              </div>
              <Button
                onClick={() => alert("Hero Section salva automaticamente!")}
                className="w-full bg-pink-500 hover:bg-pink-600"
              >
                ✓ Alterações Salvas Automaticamente
              </Button>
            </div>
          )}

          {/* Ticker Editor */}
          {activeTab === "ticker" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Título do Ticker</Label>
                <Input
                  value={adminStore.siteConfig.ticker.title}
                  onChange={(e) =>
                    adminStore.updateSiteConfig({
                      ticker: { ...adminStore.siteConfig.ticker, title: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Subtítulo do Ticker</Label>
                <Input
                  value={adminStore.siteConfig.ticker.subtitle}
                  onChange={(e) =>
                    adminStore.updateSiteConfig({
                      ticker: { ...adminStore.siteConfig.ticker, subtitle: e.target.value },
                    })
                  }
                />
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-gold">Items do Ticker</h3>
                  <Button
                    size="sm"
                    onClick={() =>
                      adminStore.addTickerItem({ pos: "6º", pct: "50%", cat: "NOVA CATEGORIA", name: "NOME", sub: "Sub" })
                    }
                    className="bg-pink-500 hover:bg-pink-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Adicionar Item
                  </Button>
                </div>
                <div className="space-y-2">
                  {adminStore.siteConfig.ticker.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-panel rounded-lg border border-pink-500/20">
                      <span className="text-sm font-bold text-gold">{item.pos}</span>
                      <div className="flex-1">
                        <div className="font-display text-sm">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.cat} • {item.pct}</div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingTickerIndex(idx)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm("Deletar este item?")) {
                            adminStore.deleteTickerItem(idx);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Stats Editor */}
          {activeTab === "stats" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-gold">Estatísticas</h3>
                <Button
                  size="sm"
                  onClick={() => adminStore.addStat({ n: "0", label: "NOVA STAT" })}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Estatística
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {adminStore.siteConfig.statsSection.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 bg-panel rounded-lg border border-pink-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display text-2xl text-gold">{stat.n}</span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingStatIndex(idx)}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm("Deletar esta estatística?")) {
                              adminStore.deleteStat(idx);
                            }
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stories/Categorias Editor */}
          {activeTab === "stories" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-gold">Stories/Círculos de Categorias</h3>
                  <p className="text-sm text-muted-foreground">Adicione ou remova categorias que aparecem nos círculos</p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    const newCategory: Category = {
                      slug: "nova-categoria",
                      circle: "/assets/model-1.jpg",
                      short: "NOVA\nCATEGORIA",
                      title: "NOVA CATEGORIA",
                      kicker: "Descrição da categoria",
                      label: "INDICADA",
                      nominees: [],
                    };
                    adminStore.addCategory(newCategory);
                  }}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Categoria
                </Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {adminStore.categories.map((cat) => (
                  <div key={cat.slug} className="p-4 bg-panel rounded-lg border border-pink-500/20 text-center">
                    <img src={cat.circle} alt={cat.title} className="w-20 h-20 rounded-full mx-auto mb-2 object-cover" />
                    <h4 className="font-display text-sm text-gold">{cat.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{cat.nominees.length} nominees</p>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          const newTitle = prompt("Novo título:", cat.title);
                          if (newTitle) {
                            adminStore.updateCategory(cat.slug, { title: newTitle });
                          }
                        }}
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Editar
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm(`Deletar categoria "${cat.title}"?`)) {
                            adminStore.deleteCategory(cat.slug);
                          }
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Backup/Reset */}
          {activeTab === "backup" && (
            <div className="space-y-4">
              <div>
                <h3 className="font-display text-gold mb-2">Backup de Dados</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Exporte todos os dados para backup ou importe dados salvos anteriormente
                </p>
                <div className="space-y-3">
                  <Button onClick={handleExport} className="w-full" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar Backup (JSON)
                  </Button>
                  <div>
                    <Label htmlFor="import-file" className="cursor-pointer">
                      <div className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>Importar Backup</span>
                      </div>
                    </Label>
                    <Input
                      id="import-file"
                      type="file"
                      accept=".json"
                      onChange={handleImport}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-destructive/50 pt-4 mt-6">
                <h3 className="font-display text-destructive mb-2">Zona de Perigo</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Restaurar todos os dados para o padrão original (irreversível!)
                </p>
                <Button onClick={handleReset} variant="destructive" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Restaurar Dados Padrão
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs para editar ticker e stats */}
      {editingTickerIndex !== null && (
        <TickerItemDialog
          item={adminStore.siteConfig.ticker.items[editingTickerIndex]}
          onSave={(updates) => {
            adminStore.updateTickerItem(editingTickerIndex, updates);
            setEditingTickerIndex(null);
          }}
          onClose={() => setEditingTickerIndex(null)}
        />
      )}

      {editingStatIndex !== null && (
        <StatDialog
          stat={adminStore.siteConfig.statsSection.stats[editingStatIndex]}
          onSave={(updates) => {
            adminStore.updateStat(editingStatIndex, updates);
            setEditingStatIndex(null);
          }}
          onClose={() => setEditingStatIndex(null)}
        />
      )}
    </div>
  );
}

// Dialog para editar item do Ticker
function TickerItemDialog({
  item,
  onSave,
  onClose,
}: {
  item: { pos: string; pct: string; cat: string; name: string; sub: string };
  onSave: (updates: Partial<typeof item>) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(item);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-gold">Editar Item do Ticker</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Posição</Label>
              <Input value={formData.pos} onChange={(e) => setFormData({ ...formData, pos: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Porcentagem</Label>
              <Input value={formData.pct} onChange={(e) => setFormData({ ...formData, pct: e.target.value })} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Input value={formData.cat} onChange={(e) => setFormData({ ...formData, cat: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Subtítulo</Label>
            <Input value={formData.sub} onChange={(e) => setFormData({ ...formData, sub: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => onSave(formData)} className="flex-1 bg-pink-500 hover:bg-pink-600">
              Salvar
            </Button>
            <Button onClick={onClose} variant="outline">
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Dialog para editar estatística
function StatDialog({
  stat,
  onSave,
  onClose,
}: {
  stat: { n: string; label: string };
  onSave: (updates: Partial<typeof stat>) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState(stat);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-gold">Editar Estatística</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Número</Label>
            <Input value={formData.n} onChange={(e) => setFormData({ ...formData, n: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Label</Label>
            <Input value={formData.label} onChange={(e) => setFormData({ ...formData, label: e.target.value })} />
          </div>
          <div className="flex gap-3">
            <Button onClick={() => onSave(formData)} className="flex-1 bg-pink-500 hover:bg-pink-600">
              Salvar
            </Button>
            <Button onClick={onClose} variant="outline">
              Cancelar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
