"use client"

import { motion } from 'framer-motion'

export default function Transition({ children }: { children: React.ReactNode }) {
	return (
		<motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{
                type: "spring",
                stiffness: 250,
                damping: 10,
            }}
        >
			{children}
		</motion.div>
	)
}
