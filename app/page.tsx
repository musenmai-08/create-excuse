"use client";

import { useState } from "react";
import Image from "next/image";
import { Category, categoryLabels, excuses } from "@/lib/excuses";

export default function Home() {
	const [selectedCategory, setSelectedCategory] = useState<Category>("work");
	const [currentExcuse, setCurrentExcuse] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);

	const generateExcuse = () => {
		const list = excuses[selectedCategory];
		const randomIndex = Math.floor(Math.random() * list.length);
		setCurrentExcuse(list[randomIndex]);
		setCopied(false);
	};

	const copyExcuse = () => {
		if (!currentExcuse) return;
		navigator.clipboard.writeText(currentExcuse);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-4 pb-12">
			<div className="w-full max-w-md">
				{/* ヘッダー */}
				<div className="text-center mb-10">
					<h1 className="text-3xl font-bold text-amber-800 mb-2">
						今日の言い訳メーカー 🐢
					</h1>
					<p className="text-amber-600 text-sm">
						やらない理由を、全力でサポートします。
					</p>
				</div>

				{/* カテゴリ選択 */}
				<div className="mb-6">
					<p className="text-sm text-amber-700 font-medium mb-3 text-center">
						カテゴリを選んでください
					</p>
					<div className="grid grid-cols-2 gap-3">
						{(Object.keys(categoryLabels) as Category[]).map((cat) => (
							<button
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								className={`py-3 rounded-2xl text-base font-medium transition-all duration-200 cursor-pointer ${
									selectedCategory === cat
										? "bg-amber-400 text-white shadow-md scale-105"
										: "bg-white text-amber-700 border border-amber-200 hover:bg-amber-100"
								}`}
							>
								{categoryLabels[cat]}
							</button>
						))}
					</div>
				</div>

				{/* 生成ボタン */}
				<button
					onClick={generateExcuse}
					className="w-full py-6 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-lg font-bold rounded-2xl shadow-lg transition-all duration-200 cursor-pointer my-10"
				>
					言い訳を作る ✨
				</button>

				{/* 言い訳表示エリア */}
				<div className="relative min-h-28 bg-white rounded-2xl border border-amber-200 shadow-sm flex items-center justify-center px-6 py-6">
					{currentExcuse && (
						<button
							onClick={copyExcuse}
							title="コピー"
							className="absolute top-3 right-3 p-1.5 rounded-lg text-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-150 cursor-pointer"
						>
							{copied ? (
								<Image
									src="/icon-check.svg"
									alt="コピー済み"
									width={16}
									height={16}
								/>
							) : (
								<Image
									src="/icon-copy.svg"
									alt="コピー"
									width={16}
									height={16}
								/>
							)}
						</button>
					)}
					{currentExcuse ? (
						<p className="text-amber-900 text-lg font-medium text-center leading-relaxed pt-2">
							{currentExcuse}
						</p>
					) : (
						<p className="text-amber-400 text-sm text-center">
							カテゴリを選んで、今日の言い訳を作ってみましょう。
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
