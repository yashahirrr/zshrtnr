import { useSearch, useNavigate } from "@tanstack/react-router";

import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import Badge from "../components/ui/Badge.jsx";

const AuthPage = () => {
	const { mode } = useSearch({ from: "/auth" });
	const navigate = useNavigate();

	const isLogin = mode !== "register";

	const switchToRegister = () => {
		navigate({
			to: "/auth",
			search: { mode: "register" },
		});
	};

	const switchToLogin = () => {
		navigate({
			to: "/auth",
			search: { mode: "login" },
		});
	};

	return (
		<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 gradient-hero">
			<div className="w-full max-w-md animate-slide-up">
				<div className="text-center mb-8">
					<div className="flex h-16 w-16 items-center justify-center mx-auto mb-4">
						<img
							src="/logo.png"
							alt="zShrtnr"
							className="h-16 w-16 object-contain"
						/>
					</div>

					<Badge variant="muted" className="mb-4">
						{isLogin ? "Welcome back" : "Get started free"}
					</Badge>

					<h1 className="text-2xl font-bold tracking-tight text-foreground">
						{isLogin ? "Sign in to your account" : "Create your account"}
					</h1>

					<p className="text-sm text-muted mt-2">
						{isLogin
							? "Access your dashboard and manage your links."
							: "Start shortening URLs and tracking clicks today."}
					</p>
				</div>

				{isLogin ? (
					<LoginForm onSwitch={switchToRegister} />
				) : (
					<RegisterForm onSwitch={switchToLogin} />
				)}
			</div>
		</div>
	);
};

export default AuthPage;

