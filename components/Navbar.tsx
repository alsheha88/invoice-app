"use client";

import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import avatar from "@/public/assets/image-avatar.jpg";
import moon from "@/public/assets/icon-moon.svg";
import sun from "@/public/assets/icon-sun.svg";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

function Navbar() {
	const { theme, setTheme } = useTheme();

	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);
	return (
		<nav className="w-full md:w-20 md:min-h-dvh md:pb-4 pr-4 md:pr-0 flex flex-row md:flex-col items-center justify-between bg-navbar md:rounded-tr-lg md:rounded-br-lg z-50">
			<div className="w-20 h-20 bg-primary flex items-center justify-center rounded-tr-lg rounded-br-lg">
				<Image src={logo} alt="logo" />
			</div>
			<div className="md:w-full flex flex-row gap-4 md:flex-col items-center">
				<div>
					{isMounted && <button
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						className="cursor-pointer">
						<Image src={theme === "dark" ? sun : moon} alt={"theme"} />
					</button>}
				</div>
				<hr className="w-px h-full md:w-full md:h-px border-0 bg-[hsla(231,20%,36%,1)]" />
				<button>
					<Image src={avatar} alt="" className="w-10 h-10 rounded-[50%]" />
				</button>
			</div>
		</nav>
	);
}

export default Navbar;
