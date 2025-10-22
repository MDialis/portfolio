//import { Button } from '@/components/ui/Button'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
//import { Github, Linkedin, Send } from 'lucide-react' // Ícones (npm install lucide-react)

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-bg-base text-text-base transition-colors duration-200">
      
      <div className="absolute top-6 right-6">
        <ThemeSwitcher />
      </div>

      <div className="flex max-w-2xl flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Olá, eu sou Mateus!
        </h1>
        <p className="mt-4 text-lg text-text-muted">
          Desenvolvedor Frontend especializado em construir (e agora, estilizar)
          experiências digitais incríveis.
        </p>

        {/*
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button variant="primary" size="lg">
            <Send className="mr-2 h-4 w-4" />
            Entre em Contato
          </Button>
          <Button variant="secondary" size="md">
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </div>
        */}

        <div className="mt-16 w-full rounded-lg border border-text-muted/20 bg-bg-surface p-8 shadow-md">
          <h2 className="text-2xl font-semibold text-primary">
            Testando o "Design System"
          </h2>
          <p className="mt-2 text-text-muted">
            Este "card" usa a cor <code className="rounded bg-bg-base px-1">bg-bg-surface</code>, 
            enquanto o fundo principal usa <code className="rounded bg-bg-surface px-1">bg-bg-base</code>.
            Teste o Dark Mode!
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3 border-t border-text-muted/20 pt-6">
          {/*
            <Button variant="primary" size="sm">
              Primary SM
            </Button>
            <Button variant="secondary" size="sm">
              Secondary SM
            </Button>
            <Button variant="outline" size="sm">
              Outline SM
            </Button>
            <Button variant="ghost" size="sm">
              Ghost SM
            </Button>
            */}
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <a href="#" aria-label="GitHub Link">
            {/*
            <Button variant="ghost" size="md">
              <Github className="h-5 w-5 text-text-muted transition-colors hover:text-text-base" />
            </Button>
            */}
          </a>
          <a href="#" aria-label="LinkedIn Link">
            {/*
            <Button variant="ghost" size="md">
              <Linkedin className="h-5 w-5 text-text-muted transition-colors hover:text-text-base" />
            </Button>
            */}
          </a>
        </div>
      </div>
    </main>
  )
}