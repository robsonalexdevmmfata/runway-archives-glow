import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/admin/login")({
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulando autenticação
    setTimeout(() => {
      if (username === "admin" && password === "1234") {
        // Salvar sessão
        localStorage.setItem("admin_session", "true");
        localStorage.setItem("admin_user", username);
        
        // Redirecionar para dashboard
        navigate({ to: "/admin/dashboard" });
      } else {
        setError("Usuário ou senha incorretos!");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-panel to-background p-4">
      {/* Fundo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <Card className="w-full max-w-md relative z-10 border-pink-500/20 shadow-[0_0_40px_rgba(236,72,153,0.1)]">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-pink-500 to-primary rounded-full flex items-center justify-center shadow-lg shadow-pink-500/50">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-display text-gold">
            Admin Login
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Acesse o painel administrativo do Runway Wavy
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Usuário
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 border-pink-500/20 focus:border-pink-400 focus:ring-pink-400/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 border-pink-500/20 focus:border-pink-400 focus:ring-pink-400/20"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
                <p className="text-sm text-destructive text-center">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-primary hover:from-pink-600 hover:to-primary/90 text-white shadow-lg shadow-pink-500/30 transition-all duration-300 hover:shadow-pink-500/50 hover:scale-[1.02]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </span>
              ) : (
                "Entrar no Admin"
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border">
            <div className="text-center space-y-2">
              <p className="text-xs text-muted-foreground">Credenciais padrão:</p>
              <div className="inline-block bg-muted/50 px-4 py-2 rounded-md">
                <p className="text-xs font-mono">
                  <span className="text-pink-400">usuário:</span> admin<br />
                  <span className="text-pink-400">senha:</span> 1234
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
