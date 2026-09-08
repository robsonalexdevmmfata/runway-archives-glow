import { createFileRoute, useNavigate, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  LogOut, 
  Settings, 
  Image, 
  Menu as MenuIcon, 
  Palette,
  FileText,
  Home,
  LayoutDashboard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminStoreProvider, useAdminStore } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    // Verificar autenticação
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
    { id: "site-config", icon: Settings, label: "Configurações do Site" },
    { id: "menu", icon: MenuIcon, label: "Menu/Navbar" },
    { id: "colors", icon: Palette, label: "Cores e Tema" },
    { id: "content", icon: FileText, label: "Conteúdo" },
  ];

  return (
    <AdminStoreProvider>
      <div className="min-h-screen bg-background flex">
        {/* Sidebar */}
        <aside className="w-64 bg-panel border-r border-border flex flex-col">
          {/* Header da Sidebar */}
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

          {/* Menu Items */}
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

          {/* User Info & Logout */}
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
          {/* Top Bar */}
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

          {/* Content Area */}
          <div className="p-8">
            {activeSection === "overview" && <OverviewSection />}
            {activeSection === "categories" && <CategoriesSection />}
            {activeSection === "site-config" && <SiteConfigSection />}
            {activeSection === "menu" && <MenuSection />}
            {activeSection === "colors" && <ColorsSection />}
            {activeSection === "content" && <ContentSection />}
          </div>
        </main>
      </div>
    </AdminStoreProvider>
  );
}

// Placeholder components for each section
function OverviewSection() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border border-pink-500/20">
          <h3 className="text-sm font-medium text-muted-foreground">Total de Categorias</h3>
          <p className="text-3xl font-display text-gold mt-2">7</p>
        </div>
        <div className="bg-card p-6 rounded-lg border border-pink-500/20">
          <h3 className="text-sm font-medium text-muted-foreground">Total de Nominees</h3>
          <p className="text-3xl font-display text-gold mt-2">35</p>
        </div>
        <div className="bg-card p-6 rounded-lg border border-pink-500/20">
          <h3 className="text-sm font-medium text-muted-foreground">Última Atualização</h3>
          <p className="text-3xl font-display text-gold mt-2">Hoje</p>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-display text-gold mb-4">Bem-vindo ao Painel Admin!</h3>
        <p className="text-muted-foreground">
          Use o menu lateral para navegar entre as diferentes seções e editar o conteúdo do site.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>✨ <strong>Categorias:</strong> Edite fotos, textos e vídeos</li>
          <li>⚙️ <strong>Configurações:</strong> Logo, favicon, header, footer</li>
          <li>🎨 <strong>Cores:</strong> Personalize o tema do site</li>
          <li>📝 <strong>Conteúdo:</strong> Edite textos e descrições</li>
        </ul>
      </div>
    </div>
  );
}

function CategoriesSection() {
  const { data, updateCategory, updateNominee, addNominee, deleteNominee } = useAdminStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editingNominee, setEditingNominee] = useState<string | null>(null);

  const category = selectedCategory 
    ? data.categories.find(c => c.slug === selectedCategory) 
    : null;

  return (
    <div className="space-y-6">
      {/* Seletor de Categoria */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-display text-gold mb-4">Selecione uma Categoria</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-300 text-left
                ${selectedCategory === cat.slug 
                  ? "border-pink-400 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.3)]" 
                  : "border-border hover:border-pink-400/50 hover:bg-pink-500/5"
                }
              `}
            >
              <h4 className="font-display text-sm text-gold">{cat.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{cat.nominees.length} itens</p>
            </button>
          ))}
        </div>
      </div>

      {/* Editor da Categoria Selecionada */}
      {category && (
        <div className="space-y-6">
          {/* Editar Info da Categoria */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h3 className="text-lg font-display text-gold mb-4">Informações da Categoria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Título</label>
                <input
                  type="text"
                  value={category.title}
                  onChange={(e) => updateCategory(category.slug, { title: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-2">Subtítulo (Kicker)</label>
                <input
                  type="text"
                  value={category.kicker}
                  onChange={(e) => updateCategory(category.slug, { kicker: e.target.value })}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Lista de Nominees */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-display text-gold">Nominees / Indicados</h3>
              <Button
                onClick={() => {
                  const newNominee = {
                    name: "Novo Item",
                    sub: "Adicione uma descrição",
                    img: "/assets/placeholder.jpg",
                    rank: `${category.nominees.length + 1}º`,
                  };
                  addNominee(category.slug, newNominee);
                }}
                className="bg-pink-500 hover:bg-pink-600"
              >
                Adicionar Novo
              </Button>
            </div>

            <div className="space-y-4">
              {category.nominees.map((nominee) => (
                <div
                  key={nominee.name}
                  className="bg-background p-4 rounded-lg border border-border hover:border-pink-400/50 transition-all"
                >
                  {editingNominee === nominee.name ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1">Nome</label>
                          <input
                            type="text"
                            value={nominee.name}
                            onChange={(e) => updateNominee(category.slug, nominee.name, { name: e.target.value })}
                            className="w-full px-3 py-2 bg-panel border border-border rounded text-sm focus:border-pink-400 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1">Subtítulo</label>
                          <input
                            type="text"
                            value={nominee.sub}
                            onChange={(e) => updateNominee(category.slug, nominee.name, { sub: e.target.value })}
                            className="w-full px-3 py-2 bg-panel border border-border rounded text-sm focus:border-pink-400 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1">URL da Imagem</label>
                          <input
                            type="text"
                            value={nominee.img}
                            onChange={(e) => updateNominee(category.slug, nominee.name, { img: e.target.value })}
                            className="w-full px-3 py-2 bg-panel border border-border rounded text-sm focus:border-pink-400 outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1">Ranking</label>
                          <input
                            type="text"
                            value={nominee.rank}
                            onChange={(e) => updateNominee(category.slug, nominee.name, { rank: e.target.value })}
                            className="w-full px-3 py-2 bg-panel border border-border rounded text-sm focus:border-pink-400 outline-none"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">URL do Vídeo (YouTube Embed)</label>
                        <input
                          type="text"
                          value={nominee.videoUrl || ""}
                          onChange={(e) => updateNominee(category.slug, nominee.name, { videoUrl: e.target.value })}
                          placeholder="https://www.youtube.com/embed/..."
                          className="w-full px-3 py-2 bg-panel border border-border rounded text-sm focus:border-pink-400 outline-none"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1">Detalhes</label>
                        <textarea
                          value={nominee.details || ""}
                          onChange={(e) => updateNominee(category.slug, nominee.name, { details: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 bg-panel border border-border rounded text-sm focus:border-pink-400 outline-none resize-none"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingNominee(null)}
                          className="bg-pink-500 hover:bg-pink-600"
                        >
                          Salvar
                        </Button>
                        <Button
                          onClick={() => setEditingNominee(null)}
                          variant="outline"
                        >
                          Cancelar
                        </Button>
                        <Button
                          onClick={() => {
                            if (confirm("Tem certeza que deseja deletar?")) {
                              deleteNominee(category.slug, nominee.name);
                              setEditingNominee(null);
                            }
                          }}
                          variant="destructive"
                          className="ml-auto"
                        >
                          Deletar
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <img
                        src={nominee.img}
                        alt={nominee.name}
                        className="w-16 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-display text-gold">{nominee.name}</h4>
                        <p className="text-sm text-muted-foreground">{nominee.sub}</p>
                        <p className="text-xs text-pink-400 mt-1">Rank: {nominee.rank}</p>
                      </div>
                      <Button
                        onClick={() => setEditingNominee(nominee.name)}
                        variant="outline"
                        size="sm"
                      >
                        Editar
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SiteConfigSection() {
  const { data, updateSiteConfig } = useAdminStore();
  const config = data.siteConfig;

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-display text-gold mb-6">Configurações Gerais do Site</h3>
        
        <div className="space-y-6">
          {/* Nome e Descrição */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="siteName" className="text-foreground">Nome do Site</Label>
              <Input
                id="siteName"
                value={config.siteName}
                onChange={(e) => updateSiteConfig({ siteName: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="siteDescription" className="text-foreground">Descrição</Label>
              <Input
                id="siteDescription"
                value={config.siteDescription}
                onChange={(e) => updateSiteConfig({ siteDescription: e.target.value })}
                className="mt-2"
              />
            </div>
          </div>

          {/* Logo e Favicon */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="logo" className="text-foreground">Texto do Logo</Label>
              <Input
                id="logo"
                value={config.logo}
                onChange={(e) => updateSiteConfig({ logo: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Texto exibido no header</p>
            </div>
            <div>
              <Label htmlFor="favicon" className="text-foreground">Favicon URL</Label>
              <Input
                id="favicon"
                value={config.favicon}
                onChange={(e) => updateSiteConfig({ favicon: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">Caminho do ícone do site</p>
            </div>
          </div>

          {/* Footer */}
          <div>
            <Label htmlFor="footerText" className="text-foreground">Texto do Rodapé</Label>
            <textarea
              id="footerText"
              value={config.footerText}
              onChange={(e) => updateSiteConfig({ footerText: e.target.value })}
              rows={3}
              className="w-full mt-2 px-4 py-2 bg-background border border-border rounded-lg focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 outline-none resize-none"
            />
          </div>

          {/* Cor do Header */}
          <div>
            <Label htmlFor="headerBg" className="text-foreground">Cor de Fundo do Header</Label>
            <div className="flex gap-4 mt-2">
              <Input
                id="headerBg"
                value={config.headerBg}
                onChange={(e) => updateSiteConfig({ headerBg: e.target.value })}
                placeholder="oklch(0.66 0.24 350)"
              />
              <div
                className="w-16 h-10 rounded border-2 border-border"
                style={{ backgroundColor: config.headerBg }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Use formato OKLCH ou hexadecimal</p>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-display text-gold mb-4">Preview</h3>
        <div className="space-y-4">
          <div 
            className="p-6 rounded-lg text-white"
            style={{ backgroundColor: config.headerBg }}
          >
            <p className="font-display text-2xl">{config.logo}</p>
            <p className="text-xs opacity-70">{config.siteDescription}</p>
          </div>
          <div className="bg-panel p-4 rounded-lg text-center text-xs text-muted-foreground">
            {config.footerText}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuSection() {
  const { data } = useAdminStore();

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-display text-gold mb-4">Itens do Menu</h3>
        <p className="text-muted-foreground mb-6">
          O menu é gerado automaticamente com base nas categorias criadas.
        </p>

        <div className="space-y-3">
          {data.categories.map((cat) => (
            <div
              key={cat.slug}
              className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <img src={cat.circle} alt={cat.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-gold">{cat.title}</h4>
                <p className="text-xs text-muted-foreground">/categoria/{cat.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full">
                  {cat.nominees.length} itens
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg border border-pink-500/20">
        <h3 className="text-lg font-display text-gold mb-2">💡 Dica</h3>
        <p className="text-sm text-muted-foreground">
          Para adicionar novos itens ao menu, crie novas categorias na seção <strong>Categorias</strong>.
          O menu lateral será atualizado automaticamente.
        </p>
      </div>
    </div>
  );
}

function ColorsSection() {
  const { data, updateSiteConfig } = useAdminStore();
  const config = data.siteConfig;

  const colorPresets = [
    { name: "Rosa Pink", primary: "oklch(0.66 0.24 350)", secondary: "oklch(0.27 0.02 330)", accent: "oklch(0.84 0.15 88)" },
    { name: "Azul Royal", primary: "oklch(0.45 0.31 264)", secondary: "oklch(0.20 0.04 264)", accent: "oklch(0.75 0.25 264)" },
    { name: "Verde Esmeralda", primary: "oklch(0.50 0.20 160)", secondary: "oklch(0.25 0.03 160)", accent: "oklch(0.70 0.15 140)" },
    { name: "Roxo Místico", primary: "oklch(0.55 0.25 300)", secondary: "oklch(0.22 0.04 300)", accent: "oklch(0.75 0.20 285)" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-display text-gold mb-6">Esquema de Cores</h3>

        {/* Paletas Predefinidas */}
        <div className="mb-8">
          <Label className="text-foreground mb-3 block">Paletas Predefinidas</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colorPresets.map((preset) => (
              <button
                key={preset.name}
                onClick={() => updateSiteConfig({
                  primaryColor: preset.primary,
                  secondaryColor: preset.secondary,
                  accentColor: preset.accent,
                })}
                className="p-4 rounded-lg border-2 border-border hover:border-pink-400 transition-all"
              >
                <div className="flex gap-2 mb-2">
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: preset.primary }} />
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: preset.secondary }} />
                  <div className="w-8 h-8 rounded" style={{ backgroundColor: preset.accent }} />
                </div>
                <p className="text-xs font-medium text-foreground">{preset.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Cores Personalizadas */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="primaryColor" className="text-foreground">Cor Primária</Label>
            <div className="flex gap-4 mt-2">
              <Input
                id="primaryColor"
                value={config.primaryColor}
                onChange={(e) => updateSiteConfig({ primaryColor: e.target.value })}
                placeholder="oklch(0.66 0.24 350)"
              />
              <div
                className="w-16 h-10 rounded border-2 border-border"
                style={{ backgroundColor: config.primaryColor }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="secondaryColor" className="text-foreground">Cor Secundária</Label>
            <div className="flex gap-4 mt-2">
              <Input
                id="secondaryColor"
                value={config.secondaryColor}
                onChange={(e) => updateSiteConfig({ secondaryColor: e.target.value })}
                placeholder="oklch(0.27 0.02 330)"
              />
              <div
                className="w-16 h-10 rounded border-2 border-border"
                style={{ backgroundColor: config.secondaryColor }}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="accentColor" className="text-foreground">Cor de Destaque (Dourado)</Label>
            <div className="flex gap-4 mt-2">
              <Input
                id="accentColor"
                value={config.accentColor}
                onChange={(e) => updateSiteConfig({ accentColor: e.target.value })}
                placeholder="oklch(0.84 0.15 88)"
              />
              <div
                className="w-16 h-10 rounded border-2 border-border"
                style={{ backgroundColor: config.accentColor }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview das Cores */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-display text-gold mb-4">Preview das Cores</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-6 rounded-lg text-center" style={{ backgroundColor: config.primaryColor }}>
            <p className="text-white font-bold">Primária</p>
            <p className="text-white/70 text-xs mt-1">Headers, botões</p>
          </div>
          <div className="p-6 rounded-lg text-center" style={{ backgroundColor: config.secondaryColor }}>
            <p className="text-white font-bold">Secundária</p>
            <p className="text-white/70 text-xs mt-1">Fundos, cards</p>
          </div>
          <div className="p-6 rounded-lg text-center" style={{ backgroundColor: config.accentColor }}>
            <p className="text-background font-bold">Destaque</p>
            <p className="text-background/70 text-xs mt-1">Títulos, links</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentSection() {
  const { data, resetData } = useAdminStore();

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-display text-gold mb-4">Gerenciamento de Conteúdo</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total de Categorias</p>
            <p className="text-3xl font-display text-gold">{data.categories.length}</p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Total de Nominees</p>
            <p className="text-3xl font-display text-gold">
              {data.categories.reduce((acc, cat) => acc + cat.nominees.length, 0)}
            </p>
          </div>
          <div className="p-4 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted-foreground mb-1">Com Vídeos</p>
            <p className="text-3xl font-display text-gold">
              {data.categories.reduce((acc, cat) => 
                acc + cat.nominees.filter(n => n.videoUrl).length, 0
              )}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-foreground mb-2">Exportar Dados</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Baixe todos os dados editados em formato JSON
            </p>
            <Button
              onClick={() => {
                const dataStr = JSON.stringify(data, null, 2);
                const dataBlob = new Blob([dataStr], { type: "application/json" });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `runway-wavy-backup-${new Date().toISOString()}.json`;
                link.click();
              }}
              variant="outline"
              className="border-pink-500/30 hover:bg-pink-500/10"
            >
              Baixar Backup (JSON)
            </Button>
          </div>

          <div className="pt-6 border-t border-border">
            <h4 className="font-medium text-destructive mb-2">⚠️ Zona de Perigo</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Restaurar todos os dados para o padrão. Esta ação não pode ser desfeita!
            </p>
            <Button
              onClick={() => {
                if (confirm("Tem certeza? Todos os dados editados serão perdidos!")) {
                  resetData();
                  alert("Dados restaurados com sucesso!");
                }
              }}
              variant="destructive"
            >
              Restaurar Padrão
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
