import Link from "next/link"
import Image from "next/image"
import { Github, Coffee } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-muted-foreground">
              A comprehensive resource for learning linear and nonlinear programming, 
              optimization techniques, and their real-world applications.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex flex-col space-y-2">
              <Link 
                href="https://github.com/zhutoutoutousan/linear-and-nonlinear-programming" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-5 w-5 mr-2" />
                <span>GitHub Repository</span>
              </Link>
              <Link 
                href="https://github.com/zhutoutoutousan/linear-and-nonlinear-programming/issues" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <span>Suggest Improvements</span>
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <div className="flex items-center space-x-2">
              <Coffee className="h-5 w-5 text-amber-500" />
              <span>Buy me a coffee</span>
            </div>
            <div className="mt-2 relative w-32 h-32 border rounded-md overflow-hidden">
              <Image 
                src="/alipay-qr.jpg" 
                fill
                alt="Alipay QR Code" 
                className="object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Linear and Nonlinear Programming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 