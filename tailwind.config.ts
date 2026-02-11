
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
				'mono': ['Fira Code', 'monospace'],
				'display': ['Orbitron', 'sans-serif']
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				tech: {
					blue: '#2563eb',
					purple: '#7c3aed',
					cyan: '#06b6d4',
					indigo: '#6366f1',
					green: '#10b981',
					red: '#ef4444',
					orange: '#f97316',
					pink: '#ec4899'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				fadeIn: {
					from: { opacity: '0', transform: 'translateY(20px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.5' }
				},
				shimmer: {
					'100%': { transform: 'translateX(100%)' }
				},
				glitch: {
					'0%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' },
					'100%': { transform: 'translate(0)' },
				},
				'gradient-x': {
					'0%, 100%': { 
						'background-position': '0% 50%',
						'background-size': '200% 200%',
					},
					'50%': { 
						'background-position': '100% 50%',
						'background-size': '200% 200%',
					},
				},
				'text-reveal': {
					'0%': { 'clip-path': 'inset(0 100% 0 0)' },
					'100%': { 'clip-path': 'inset(0 0 0 0)' }
				},
				parallax: {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-20px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'fadeIn': 'fadeIn 0.7s ease-out forwards',
				'pulse': 'pulse 2s ease-in-out infinite',
				'shimmer': 'shimmer 1.5s infinite',
				'glitch': 'glitch 1s infinite',
				'gradient-x': 'gradient-x 15s ease infinite',
				'text-reveal': 'text-reveal 1s ease forwards',
				'parallax': 'parallax 3s ease-out infinite alternate'
			},
			backgroundImage: {
				'gradient-tech': 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
				'gradient-cyber': 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
				'gradient-ai': 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
				'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
				'grid-pattern': 'linear-gradient(to right, hsl(var(--border) / 0.3) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border) / 0.3) 1px, transparent 1px)',
				'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
