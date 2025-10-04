import { MapPin, Mail } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-6 w-6 text-primary" />
                <span className="font-bold text-lg">Mohali.ai</span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                Your comprehensive guide to everything Mohali has to offer.
              </p>
            </div>

            {/* Explore Links */}
            <div>
              <h5 className="font-semibold mb-4">Explore</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/businesses" className="text-muted-foreground hover:text-blue-500">
                    Businesses
                  </Link>
                </li>
                <li>
                  <Link href="/tourism" className="text-muted-foreground hover:text-blue-500">
                    Tourism
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-muted-foreground hover:text-blue-500">
                    Events
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  info@Mohali.ai
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2024 Matchbest. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-blue-500">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-500">
                Terms of Service
              </Link>
              <Link href="/return-policy" className="hover:text-blue-500">
                Return Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
