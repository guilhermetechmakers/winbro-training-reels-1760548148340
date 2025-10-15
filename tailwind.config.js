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
			primary: {
				DEFAULT: 'hsl(var(--primary))',
				foreground: 'hsl(var(--primary-foreground))'
			},
			secondary: {
				DEFAULT: 'hsl(var(--secondary))',
				foreground: 'hsl(var(--secondary-foreground))'
			},
			background: 'hsl(var(--background))',
			foreground: 'hsl(var(--foreground))',
			card: {
				DEFAULT: 'hsl(var(--card))',
				foreground: 'hsl(var(--card-foreground))'
			},
			border: 'hsl(var(--border))',
			input: 'hsl(var(--input))',
			ring: 'hsl(var(--ring))',
			muted: {
				DEFAULT: 'hsl(var(--muted))',
				foreground: 'hsl(var(--muted-foreground))'
			},
			// Winbro Design System Colors
			'winbro-blue': {
				DEFAULT: '#003F7F',
				50: '#E6F2FF',
				100: '#CCE5FF',
				200: '#99CCFF',
				300: '#66B2FF',
				400: '#3399FF',
				500: '#003F7F',
				600: '#003366',
				700: '#002A4D',
				800: '#002033',
				900: '#00151A'
			},
			'industrial-gray': {
				DEFAULT: '#444B54',
				50: '#F4F5F6',
				100: '#E9EAEC',
				200: '#D3D5D9',
				300: '#BCC0C6',
				400: '#A6ABB3',
				500: '#444B54',
				600: '#3A4047',
				700: '#2F343A',
				800: '#25292D',
				900: '#1A1D20'
			},
			'process-orange': {
				DEFAULT: '#FF7C2D',
				50: '#FFF4ED',
				100: '#FFE9DB',
				200: '#FFD3B7',
				300: '#FFBD93',
				400: '#FFA76F',
				500: '#FF7C2D',
				600: '#E66A1A',
				700: '#CC5817',
				800: '#B34614',
				900: '#993411'
			},
			'emerald-green': {
				DEFAULT: '#2ECC71',
				50: '#E8F8F5',
				100: '#D1F2EB',
				200: '#A3E4D7',
				300: '#75D6C3',
				400: '#47C8AF',
				500: '#2ECC71',
				600: '#28B463',
				700: '#229954',
				800: '#1C7E45',
				900: '#166336'
			},
			'amber': {
				DEFAULT: '#FFC107',
				50: '#FFFDF2',
				100: '#FFFBE6',
				200: '#FFF7CC',
				300: '#FFF3B3',
				400: '#FFEF99',
				500: '#FFC107',
				600: '#E6AE06',
				700: '#CC9B05',
				800: '#B38804',
				900: '#997503'
			},
			'error-red': {
				DEFAULT: '#E53935',
				50: '#FDF2F2',
				100: '#FCE5E5',
				200: '#F9CCCC',
				300: '#F6B3B3',
				400: '#F39999',
				500: '#E53935',
				600: '#CE332F',
				700: '#B72D29',
				800: '#A02723',
				900: '#89211D'
			},
			'light-gray': '#F4F6FA',
			'text-primary': '#222E3A',
			'text-secondary': '#65748B',
			accent: {
				DEFAULT: 'hsl(var(--accent))',
				foreground: 'hsl(var(--accent-foreground))'
			},
			destructive: {
				DEFAULT: 'hsl(var(--destructive))',
				foreground: 'hsl(var(--destructive-foreground))'
			}
		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'Roboto',
  				'Arial',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			h1: [
  				'2.5rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			h2: [
  				'2rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '600'
  				}
  			],
  			h3: [
  				'1.5rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '600'
  				}
  			],
  			h4: [
  				'1.2rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '500'
  				}
  			],
  			body: [
  				'1rem',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			],
  			caption: [
  				'0.85rem',
  				{
  					lineHeight: '1.5',
  					fontWeight: '500'
  				}
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		animation: {
			'fade-in': 'fadeIn 0.4s ease-out',
			'fade-in-up': 'fadeInUp 0.4s ease-out',
			'fade-in-down': 'fadeInDown 0.4s ease-out',
			'slide-in-left': 'slideInLeft 0.3s ease-out',
			'slide-in-right': 'slideInRight 0.3s ease-out',
			'scale-in': 'scaleIn 0.2s ease-out',
			'bounce-in': 'bounceIn 0.6s ease-out',
			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out',
			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			'float': 'float 6s ease-in-out infinite',
			'gradient-x': 'gradient-x 15s ease infinite',
			'gradient-y': 'gradient-y 15s ease infinite',
			'gradient-xy': 'gradient-xy 15s ease infinite',
			'shimmer': 'shimmer 2s linear infinite',
			'wiggle': 'wiggle 1s ease-in-out infinite'
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
			},
			float: {
				'0%, 100%': {
					transform: 'translateY(0px)'
				},
				'50%': {
					transform: 'translateY(-20px)'
				}
			},
			'gradient-x': {
				'0%, 100%': {
					'background-size': '200% 200%',
					'background-position': 'left center'
				},
				'50%': {
					'background-size': '200% 200%',
					'background-position': 'right center'
				}
			},
			'gradient-y': {
				'0%, 100%': {
					'background-size': '200% 200%',
					'background-position': 'center top'
				},
				'50%': {
					'background-size': '200% 200%',
					'background-position': 'center bottom'
				}
			},
			'gradient-xy': {
				'0%, 100%': {
					'background-size': '400% 400%',
					'background-position': 'left center'
				},
				'50%': {
					'background-size': '400% 400%',
					'background-position': 'right center'
				}
			},
			shimmer: {
				'0%': {
					'background-position': '-200% 0'
				},
				'100%': {
					'background-position': '200% 0'
				}
			},
			wiggle: {
				'0%, 100%': {
					transform: 'rotate(-3deg)'
				},
				'50%': {
					transform: 'rotate(3deg)'
				}
			}
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem'
  		},
  		boxShadow: {
  			card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  			'card-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  			elevated: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  		}
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}