import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

const footerLinks = [
	{ label: "Home", to: "/" },
	{ label: "Dashboard", to: "/dashboard" },
	{ label: "Sign In", to: "/auth?mode=login" },
];

export default function Footer() {
	return (
		<footer className="border-t border-border bg-card mt-auto">
			<div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Brand */}
					<div>
						<div className="flex items-center gap-3 mb-3">
							<img
								src="/logo.png"
								alt="zShrtnr logo"
								className="h-9 w-9 object-contain rounded-md"
							/>

							<span className="text-base font-semibold tracking-tight text-foreground">
								zShrtnr
							</span>
						</div>

						<p className="text-sm text-muted leading-relaxed max-w-xs">
							Shorten URLs, share them easily, and track their performance.
						</p>
					</div>

					{/* Product */}
					<div>
						<h4 className="text-sm font-semibold text-foreground mb-3">
							Product
						</h4>

						<ul className="space-y-2">
							{footerLinks.map((link) => (
								<li key={link.label}>
									<Link
										to={link.to}
										className="text-sm text-muted hover:text-foreground transition-colors"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Connect */}
					<div>
						<h4 className="text-sm font-semibold text-foreground mb-3">
							Connect
						</h4>

						<a
							href="https://github.com/yashahirrr/zshrtnr"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
						>
							<ExternalLink className="h-4 w-4" />
							GitHub
						</a>
					</div>
				</div>

				{/* Bottom section */}
				<div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
					<p className="text-xs text-muted">
						&copy; {new Date().getFullYear()} zShrtnr. All rights reserved.
					</p>

					<p className="text-xs text-muted">
						Built with React, Vite, Node.js &amp; MongoDB
					</p>
				</div>
			</div>
		</footer>
	);
}

