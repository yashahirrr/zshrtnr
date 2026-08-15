import { useState } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { useSelector, useDispatch } from 'react-redux'
import {
  Link2, Menu, X, LogOut, LogIn, UserPlus, User,
} from 'lucide-react'
import { logoutUser } from '../api/user.api.js'
import { logout } from '../store/slice/authSlice.js'
import Button from './ui/Button.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/dashboard', label: 'Dashboard', auth: true },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutUser()
    } catch {
      /* proceed with local logout */
    }
    dispatch(logout())
    navigate({ to: '/' })
    setMobileOpen(false)
  }

  const visibleLinks = navLinks.filter((l) => !l.auth || isAuthenticated)

  return (
		<header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-lg">
			<nav
				className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
				aria-label="Main navigation"
			>
				<div className="flex h-16 items-center justify-between">
					{/* Logo */}
					<Link
						to="/"
						className="flex items-center gap-2.5 group"
						onClick={() => setMobileOpen(false)}
					>
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
							<Link2 className="h-4 w-4" aria-hidden="true" />
						</div>
						<span className="text-base font-semibold tracking-tight text-foreground">
							zShrtnr
						</span>
					</Link>

					{/* Desktop nav */}
					<div className="hidden md:flex items-center gap-1">
						{visibleLinks.map((link) => (
							<Link
								key={link.to}
								to={link.to}
								className="px-3 py-2 text-sm font-medium text-muted hover:text-foreground rounded-lg hover:bg-accent transition-colors"
								activeProps={{
									className:
										"px-3 py-2 text-sm font-medium text-foreground bg-accent rounded-lg",
								}}
							>
								{link.label}
							</Link>
						))}
					</div>

					{/* Desktop actions */}
					<div className="hidden md:flex items-center gap-2">
						<ThemeToggle />
						{isAuthenticated ? (
							<>
								<div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent">
									<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
										<User className="h-3.5 w-3.5" aria-hidden="true" />
									</div>
									<span className="text-sm font-medium text-foreground max-w-[120px] truncate">
										{user?.name || user?.email || "User"}
									</span>
								</div>
								<Button variant="ghost" size="sm" onClick={handleLogout}>
									<LogOut className="h-4 w-4" />
									Logout
								</Button>
							</>
						) : (
							<>
								<Link to="/auth" search={{ mode: "login" }}>
									<Button variant="ghost" size="sm">
										<LogIn className="h-4 w-4" />
										Sign In
									</Button>
								</Link>
								<Link to="/auth" search={{ mode: "register" }}>
									<Button size="sm">
										<UserPlus className="h-4 w-4" />
										Sign Up
									</Button>
								</Link>
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="flex md:hidden items-center gap-2">
						<ThemeToggle />
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setMobileOpen(!mobileOpen)}
							aria-label={mobileOpen ? "Close menu" : "Open menu"}
							aria-expanded={mobileOpen}
						>
							{mobileOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile menu */}
				{mobileOpen && (
					<div className="md:hidden border-t border-border py-4 animate-slide-up">
						<div className="flex flex-col gap-1">
							{visibleLinks.map((link) => (
								<Link
									key={link.to}
									to={link.to}
									className="px-3 py-2.5 text-sm font-medium text-muted hover:text-foreground rounded-lg hover:bg-accent transition-colors"
									onClick={() => setMobileOpen(false)}
									activeProps={{
										className:
											"px-3 py-2.5 text-sm font-medium text-foreground bg-accent rounded-lg",
									}}
								>
									{link.label}
								</Link>
							))}
						</div>
						<div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
							{isAuthenticated ? (
								<>
									<div className="flex items-center gap-2 px-3 py-2">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
											<User className="h-4 w-4" />
										</div>
										<span className="text-sm font-medium">
											{user?.name || user?.email}
										</span>
									</div>
									<Button
										variant="secondary"
										onClick={handleLogout}
										className="w-full justify-center"
									>
										<LogOut className="h-4 w-4" />
										Logout
									</Button>
								</>
							) : (
								<>
									<Link
										to="/auth"
										search={{ mode: "login" }}
										onClick={() => setMobileOpen(false)}
									>
										<Button
											variant="secondary"
											className="w-full justify-center"
										>
											<LogIn className="h-4 w-4" />
											Sign In
										</Button>
									</Link>
									<Link
										to="/auth"
										search={{ mode: "register" }}
										onClick={() => setMobileOpen(false)}
									>
										<Button className="w-full justify-center">
											<UserPlus className="h-4 w-4" />
											Sign Up
										</Button>
									</Link>
								</>
							)}
						</div>
					</div>
				)}
			</nav>
		</header>
	);
}
