import { useState } from "react";
import { useSearch } from "@tanstack/react-router";
import { Link2 } from "lucide-react";
import LoginForm from "../components/LoginForm.jsx";
import RegisterForm from "../components/RegisterForm.jsx";
import Badge from "../components/ui/Badge.jsx";

const AuthPage = () => {
	const { mode } = useSearch({ from: "/auth" });

	const [isLogin, setIsLogin] = useState(mode !== "register");

	return (
		<div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 gradient-hero">
			<div className="w-full max-w-md animate-slide-up">
				<div className="text-center mb-8">
					<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mx-auto mb-4">
						<Link2 className="h-6 w-6" aria-hidden="true" />
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
					<LoginForm onSwitch={() => setIsLogin(false)} />
				) : (
					<RegisterForm onSwitch={() => setIsLogin(true)} />
				)}
			</div>
		</div>
	);
};

export default AuthPage;

// import { useState } from 'react'
// import { Link2 } from 'lucide-react'
// import LoginForm from '../components/LoginForm.jsx'
// import RegisterForm from '../components/RegisterForm.jsx'
// import Badge from '../components/ui/Badge.jsx'

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true)

//   return (
//     <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12 gradient-hero">
//       <div className="w-full max-w-md animate-slide-up">
//         <div className="text-center mb-8">
//           <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mx-auto mb-4">
//             <Link2 className="h-6 w-6" aria-hidden="true" />
//           </div>
//           <Badge variant="muted" className="mb-4">
//             {isLogin ? 'Welcome back' : 'Get started free'}
//           </Badge>
//           <h1 className="text-2xl font-bold tracking-tight text-foreground">
//             {isLogin ? 'Sign in to your account' : 'Create your account'}
//           </h1>
//           <p className="text-sm text-muted mt-2">
//             {isLogin
//               ? 'Access your dashboard and manage your links.'
//               : 'Start shortening URLs and tracking clicks today.'}
//           </p>
//         </div>

//         {isLogin ? (
//           <LoginForm onSwitch={() => setIsLogin(false)} />
//         ) : (
//           <RegisterForm onSwitch={() => setIsLogin(true)} />
//         )}
//       </div>
//     </div>
//   )
// }

// export default AuthPage
