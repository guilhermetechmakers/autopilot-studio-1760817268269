/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			surface: {
  				base: '#0E1116',
  				sunken: '#1A1D23',
  				elevated: '#2A2E35'
  			},
  			text: {
  				primary: '#FFFFFF',
  				secondary: '#B0B3B8',
  				muted: '#7A7D81'
  			},
  			brand: {
  				primary: '#3B82F6',
  				hover: '#2563EB',
  				pressed: '#1D4ED8'
  			},
  			states: {
  				success: '#22C55E',
  				warning: '#F59E0B',
  				danger: '#EF4444',
  				info: '#3B82F6'
  			},
  			borders: {
  				strong: '#3A3F44',
  				subtle: '#B0B3B8'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'Arial',
  				'sans-serif'
  			],
  			mono: [
  				'Menlo',
  				'monospace'
  			]
  		},
  		fontSize: {
  			h1: [
  				'32px',
  				{
  					lineHeight: '40px',
  					fontWeight: '700',
  					letterSpacing: '-0.5px'
  				}
  			],
  			h2: [
  				'28px',
  				{
  					lineHeight: '36px',
  					fontWeight: '600',
  					letterSpacing: '-0.5px'
  				}
  			],
  			h3: [
  				'24px',
  				{
  					lineHeight: '32px',
  					fontWeight: '500',
  					letterSpacing: '0'
  				}
  			],
  			'body-l': [
  				'18px',
  				{
  					lineHeight: '24px',
  					fontWeight: '400',
  					letterSpacing: '0'
  				}
  			],
  			body: [
  				'16px',
  				{
  					lineHeight: '24px',
  					fontWeight: '400',
  					letterSpacing: '0'
  				}
  			],
  			caption: [
  				'12px',
  				{
  					lineHeight: '16px',
  					fontWeight: '400',
  					letterSpacing: '0.5px'
  				}
  			],
  			numeric: [
  				'16px',
  				{
  					lineHeight: '24px',
  					fontWeight: '700',
  					letterSpacing: '0'
  				}
  			]
  		},
  		spacing: {
  			'4': '4px',
  			'8': '8px',
  			'12': '12px',
  			'16': '16px',
  			'20': '20px',
  			'24': '24px',
  			'32': '32px',
  			'40': '40px',
  			'48': '48px',
  			'64': '64px'
  		},
  		borderRadius: {
  			xs: '2px',
  			sm: '4px',
  			md: '8px',
  			lg: '16px',
  			full: '9999px'
  		},
  		boxShadow: {
  			card: '0 2px 4px rgba(0, 0, 0, 0.1)',
  			popover: '0 4px 8px rgba(0, 0, 0, 0.2)',
  			modal: '0 8px 16px rgba(0, 0, 0, 0.3)',
  			hover: '0 4px 12px rgba(0, 0, 0, 0.2)'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.4s ease-out',
  			'fade-in-up': 'fadeInUp 0.4s ease-out',
  			'fade-in-down': 'fadeInDown 0.4s ease-out',
  			'slide-in-left': 'slideInLeft 0.3s ease-out',
  			'slide-in-right': 'slideInRight 0.3s ease-out',
  			'scale-in': 'scaleIn 0.2s ease-out',
  			'bounce-in': 'bounceIn 0.6s ease-out',
  			shimmer: 'shimmer 1s linear infinite',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeInUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			fadeInDown: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(-20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideInLeft: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(-20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			slideInRight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateX(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateX(0)'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.9)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			bounceIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale(0.3)'
  				},
  				'50%': {
  					opacity: '1',
  					transform: 'scale(1.05)'
  				},
  				'70%': {
  					transform: 'scale(0.9)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale(1)'
  				}
  			},
  			shimmer: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		transitionDuration: {
  			'200': '200ms',
  			'300': '300ms',
  			'500': '500ms'
  		},
  		transitionTimingFunction: {
  			smooth: 'cubic-bezier(0.4, 0, 0.2, 1)'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}