// Name: Number Utilities
// ID: numberUtilities
// Description: Adds blocks for number formatting and manipulation using JavaScript number functions
// By: MubiLop

(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('"Number Utilities" cannot run unsandboxed.');
  }

  const { BlockType, ArgumentType, MenuType } = Scratch;

  const LANGUAGE_CODES = {
    'system': 'System Default',
    'en-US': 'English (US)',
    'en-GB': 'English (UK)',
    'es-ES': 'Spanish (Spain)',
    'es-MX': 'Spanish (Mexico)',
    'fr-FR': 'French',
    'de-DE': 'German',
    'it-IT': 'Italian',
    'pt-BR': 'Portuguese (Brazil)',
    'pt-PT': 'Portuguese (Portugal)',
    'ru-RU': 'Russian',
    'ja-JP': 'Japanese',
    'ko-KR': 'Korean',
    'zh-CN': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)',
    'ar-SA': 'Arabic',
    'hi-IN': 'Hindi',
    'tr-TR': 'Turkish',
    'nl-NL': 'Dutch',
    'pl-PL': 'Polish',
    'vi-VN': 'Vietnamese',
    'th-TH': 'Thai',
    'sv-SE': 'Swedish',
    'da-DK': 'Danish',
    'fi-FI': 'Finnish',
    'no-NO': 'Norwegian',
    'cs-CZ': 'Czech',
    'el-GR': 'Greek',
    'he-IL': 'Hebrew',
    'hu-HU': 'Hungarian',
    'ro-RO': 'Romanian'
  };

  const CURRENCY_CODES = {
    'USD': 'US Dollar',
    'EUR': 'Euro',
    'GBP': 'British Pound',
    'JPY': 'Japanese Yen',
    'CNY': 'Chinese Yuan',
    'KRW': 'South Korean Won',
    'INR': 'Indian Rupee',
    'RUB': 'Russian Ruble',
    'BRL': 'Brazilian Real',
    'MXN': 'Mexican Peso',
    'CAD': 'Canadian Dollar',
    'AUD': 'Australian Dollar',
    'NZD': 'New Zealand Dollar',
    'CHF': 'Swiss Franc',
    'SEK': 'Swedish Krona',
    'NOK': 'Norwegian Krone',
    'DKK': 'Danish Krone',
    'SGD': 'Singapore Dollar',
    'HKD': 'Hong Kong Dollar',
    'AED': 'UAE Dirham',
    'SAR': 'Saudi Riyal',
    'ZAR': 'South African Rand',
    'TRY': 'Turkish Lira',
    'PLN': 'Polish Złoty',
    'THB': 'Thai Baht',
    'IDR': 'Indonesian Rupiah',
    'PHP': 'Philippine Peso',
    'MYR': 'Malaysian Ringgit',
    'VND': 'Vietnamese Dong',
    'EGP': 'Egyptian Pound'
  };
  
  const ico = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBpZD0ic3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjE1Ni41NCA0MS42NCA4Ni43OSA4Ni45NCI+PGcgaWQ9InN2Z2ciPjxwYXRoIGlkPSJwYXRoMCIgZD0iTTE5NS44MzYgNDUuODAxIEMgMTk1LjY1MCA0NS44NDQsMTk0LjczOCA0NS45OTksMTkzLjgxMCA0Ni4xNDUgQyAxNjEuOTc0IDUxLjE2MSwxNDkuMTk2IDg5Ljk4NSwxNzEuODE4IDExMi45NjggQyAxODkuNzg5IDEzMS4yMjcsMjIwLjQ5MiAxMjcuNTU1LDIzMy42NzkgMTA1LjU3MSBDIDI0OS4zMjAgNzkuNDk2LDIzMC45MTYgNDYuMjc1LDIwMC41NjMgNDUuNzkxIEMgMTk4LjE0OSA0NS43NTMsMTk2LjAyMSA0NS43NTcsMTk1LjgzNiA0NS44MDEgTTE3OS4xMzYgNzQuMzQ0IEMgMTc5LjM5MiA3NC42NTMsMTc5LjUxNyA5NS43ODQsMTc5LjI2NiA5Ni40MzggQyAxNzkuMTUyIDk2LjczNiwxNzguNjUyIDk2Ljc5MiwxNzYuMTE1IDk2Ljc5MiBMIDE3My4xMDEgOTYuNzkyIDE3My4xMDEgODkuMjUyIEMgMTczLjEwMSA4NS4xMDQsMTczLjA1MSA4MS43MTEsMTcyLjk5MSA4MS43MTEgQyAxNzIuODc2IDgxLjcxMSwxNjkuNTQzIDgzLjk3NSwxNjguNjI1IDg0LjY3NyBDIDE2Ny41NTggODUuNDkzLDE2Ny40NzMgODUuMzE3LDE2Ny40NzMgODIuMjkwIEwgMTY3LjQ3MyA3OS40OTMgMTY5LjU1NSA3OC4wNDQgQyAxNzAuNzAxIDc3LjI0OCwxNzIuMjczIDc2LjE1MSwxNzMuMDUwIDc1LjYwOCBDIDE3My44MjcgNzUuMDY1LDE3NC42ODggNzQuNDk1LDE3NC45NjQgNzQuMzQyIEMgMTc1LjY0MCA3My45NjYsMTc4LjgyNCA3My45NjgsMTc5LjEzNiA3NC4zNDQgTTIwNC43MjcgNzQuNzI3IEMgMjA1LjM0NiA3NS4wMTMsMjA1LjkwMyA3NS4zMTEsMjA1Ljk2NSA3NS4zODkgQyAyMDYuMDI3IDc1LjQ2NywyMDYuMzYxIDc1LjcxMSwyMDYuNzA3IDc1LjkzMiBDIDIwOS4wOTUgNzcuNDUyLDIxMC40NDUgODIuMzQ4LDIwOS45ODMgODcuODEyIEMgMjA5Ljc5NiA5MC4wMjUsMjA5LjYxMCA5MC42NzgsMjA4LjU5MyA5Mi43MDIgQyAyMDYuMTI2IDk3LjYxMywxOTcuODA3IDk4LjYwNiwxOTMuNzQ4IDk0LjQ3NSBDIDE4OS44NTMgOTAuNTExLDE4OS44NzEgODAuNjc5LDE5My43ODEgNzYuNDU3IEMgMTk1LjkyMyA3NC4xNDQsMjAxLjU0NSA3My4yNTUsMjA0LjcyNyA3NC43MjcgTTIyNS43NzQgNzQuNDc0IEMgMjI1Ljc3NCA3NC41NzksMjI1LjUzNyA3NS4xMTEsMjI1LjI0NyA3NS42NTYgQyAyMjQuNzE5IDc2LjY0OSwyMjIuNzA1IDgwLjQ5MSwyMjAuNDUxIDg0LjgwNSBDIDIxOC45MjMgODcuNzI5LDIxOC44NzUgODcuNTYzLDIyMS4yNDggODcuNTYzIEMgMjIzLjYxMiA4Ny41NjMsMjIzLjQ1MSA4Ny43NjQsMjIzLjc2OCA4NC40MjYgQyAyMjQuMDQzIDgxLjUxNiwyMjMuODYyIDgxLjY4MSwyMjYuNjk0IDgxLjc1OSBMIDIyOS4wMzggODEuODIzIDIyOS4xMDEgODQuNjgzIEwgMjI5LjE2NCA4Ny41NDIgMjMwLjU2NCA4Ny42MDkgTCAyMzEuOTY0IDg3LjY3NiAyMzEuOTY0IDkwLjAzOSBMIDIzMS45NjQgOTIuNDAzIDIzMC41NjUgOTIuNDcwIEwgMjI5LjE2NyA5Mi41MzcgMjI5LjEwMiA5NC42MDggTCAyMjkuMDM4IDk2LjY4MCAyMjYuMjI0IDk2LjY4MCBMIDIyMy40MTAgOTYuNjgwIDIyMy4zNDYgOTQuNTk4IEwgMjIzLjI4MSA5Mi41MTUgMjE3LjY2MiA5Mi41MTUgTCAyMTIuMDQzIDkyLjUxNSAyMTIuMDQzIDkwLjY0NyBDIDIxMi4wNDMgODkuNjIwLDIxMi4xMzQgODguNjgzLDIxMi4yNDUgODguNTY1IEMgMjEyLjM1NiA4OC40NDcsMjEzLjEwNCA4Ny4wODUsMjEzLjkwNyA4NS41MzcgQyAyMTQuNzEwIDgzLjk5MCwyMTUuOTM0IDgxLjY2MCwyMTYuNjI4IDgwLjM2MCBDIDIxNy4zMjIgNzkuMDYwLDIxOC4zMTkgNzcuMTYxLDIxOC44NDMgNzYuMTQwIEwgMjE5Ljc5NiA3NC4yODIgMjIyLjc4NSA3NC4yODIgQyAyMjQuNDI5IDc0LjI4MiwyMjUuNzc0IDc0LjM2OSwyMjUuNzc0IDc0LjQ3NCBNMTk5LjEwMCA3OS40MzUgQyAxOTYuNDg3IDgwLjU3NSwxOTYuMjM1IDg5LjU5MywxOTguNzY3IDkxLjMzNCBDIDE5OS43NTEgOTIuMDEwLDIwMS4zOTEgOTIuMDI3LDIwMi4yMjcgOTEuMzY5IEMgMjA0LjQ0NyA4OS42MjIsMjA0LjYwNCA4Mi41MTcsMjAyLjQ4MiA3OS44MTIgQyAyMDIuMTAwIDc5LjMyNSwxOTkuOTEwIDc5LjA4MiwxOTkuMTAwIDc5LjQzNSBNMTg4Ljc4NCA5MC45ODYgQyAxOTEuMTYwIDkzLjM2MiwxODkuMzUxIDk3LjAxNywxODUuNzk4IDk3LjAxNyBDIDE4MS44MDcgOTcuMDE3LDE4MC41NTAgOTEuOTEyLDE4NC4xMjMgOTAuMjEzIEMgMTg1LjIyNCA4OS42ODksMTg3LjkzNyA5MC4xMzksMTg4Ljc4NCA5MC45ODYgIiBzdHJva2U9Im5vbmUiIGZpbGw9IiM1Y2JjNWMiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGlkPSJwYXRoMSIgZD0iTTE5NC45MzUgNDEuODQ0IEMgMTk0LjkzNSA0MS45NTQsMTkzLjkyMiA0Mi4xMTcsMTkyLjY4NCA0Mi4yMDYgQyAxOTEuNDQ2IDQyLjI5NSwxOTAuNDMzIDQyLjQ0NCwxOTAuNDMzIDQyLjUzNyBDIDE5MC40MzMgNDIuNjMwLDE4OS42NzQgNDIuODI5LDE4OC43NDUgNDIuOTc5IEMgMTg3LjgxNyA0My4xMjksMTg3LjA1NyA0My4zMzcsMTg3LjA1NyA0My40NDEgQyAxODcuMDU3IDQzLjU0NSwxODYuNjUyIDQzLjY5OCwxODYuMTU2IDQzLjc4MiBDIDE4NS42NjEgNDMuODY1LDE4NS4yNTYgNDQuMDEzLDE4NS4yNTYgNDQuMTEwIEMgMTg1LjI1NiA0NC4yMDYsMTg0LjkxNSA0NC4zNDEsMTg0LjQ5OSA0NC40MDggQyAxODQuMDgyIDQ0LjQ3NiwxODIuOTQyIDQ0LjkwNCwxODEuOTY2IDQ1LjM1OCBDIDE4MC45OTAgNDUuODEzLDE3OS44MzcgNDYuMzQ4LDE3OS40MDMgNDYuNTQ3IEMgMTc4LjYyMyA0Ni45MDUsMTc2LjkxOSA0Ny45MzYsMTc2LjcwMiA0OC4xODIgQyAxNzYuNjQwIDQ4LjI1MiwxNzYuMjY4IDQ4LjQzOSwxNzUuODc0IDQ4LjU5OCBDIDE3NS40ODEgNDguNzU3LDE3NS4xMDQgNDkuMDMwLDE3NS4wMzcgNDkuMjA1IEMgMTc0Ljk3MCA0OS4zNzksMTc0Ljc2MSA0OS41MjIsMTc0LjU3MSA0OS41MjIgQyAxNzQuMzgxIDQ5LjUyMiwxNzQuMjI2IDQ5LjYyMCwxNzQuMjI2IDQ5Ljc0MCBDIDE3NC4yMjYgNDkuODU5LDE3My45ODYgNTAuMDg3LDE3My42OTMgNTAuMjQ2IEMgMTcyLjg0NSA1MC43MDYsMTcxLjY1NyA1MS43MzAsMTY5LjMwNyA1NC4wMjcgQyAxNjcuMzk1IDU1Ljg5OCwxNjYuNjgzIDU2LjcwOCwxNjQuODIwIDU5LjE0MyBDIDE2NC42MDggNTkuNDIwLDE2NC4yNTcgNTkuODY2LDE2NC4wNDEgNjAuMTM0IEMgMTYzLjgyNCA2MC40MDEsMTYzLjY0NyA2MC43NTcsMTYzLjY0NyA2MC45MjQgQyAxNjMuNjQ3IDYxLjA5MCwxNjMuNTQ3IDYxLjIyNywxNjMuNDI1IDYxLjIyNyBDIDE2My4zMDIgNjEuMjI3LDE2My4wNTEgNjEuNTU2LDE2Mi44NjYgNjEuOTU4IEMgMTYyLjQ5MSA2Mi43NzUsMTYyLjA4OSA2My40MjgsMTYxLjY5NSA2My44NjAgQyAxNjEuNTUxIDY0LjAxOSwxNjEuMzY1IDY0LjQ1MywxNjEuMjg0IDY0LjgyNiBDIDE2MS4yMDIgNjUuMTk5LDE2MS4wNTggNjUuNTA0LDE2MC45NjMgNjUuNTA0IEMgMTYwLjg2OSA2NS41MDQsMTYwLjY3MCA2NS45MDksMTYwLjUyMiA2Ni40MDQgQyAxNjAuMzczIDY2Ljg5OSwxNjAuMTU5IDY3LjMwNCwxNjAuMDQ2IDY3LjMwNCBDIDE1OS45MzMgNjcuMzA0LDE1OS43NzQgNjcuNjU5LDE1OS42OTMgNjguMDkyIEMgMTU5LjYxMSA2OC41MjYsMTU5LjQ3MSA2OC44ODAsMTU5LjM4MSA2OC44ODAgQyAxNTkuMjkwIDY4Ljg4MCwxNTkuMDgzIDY5LjQzNywxNTguOTIwIDcwLjExOCBDIDE1OC43NTYgNzAuNzk5LDE1OC41NDEgNzEuMzU2LDE1OC40NDEgNzEuMzU2IEMgMTU4LjM0MSA3MS4zNTYsMTU4LjE5MyA3MS44NjMsMTU4LjExMCA3Mi40ODIgQyAxNTguMDI4IDczLjEwMSwxNTcuODg5IDczLjYwNywxNTcuODAxIDczLjYwNyBDIDE1Ny43MTMgNzMuNjA3LDE1Ny41MDggNzQuNDk0LDE1Ny4zNDUgNzUuNTc3IEMgMTU3LjE4MiA3Ni42NjAsMTU2LjkzNyA3Ny42ODksMTU2LjgwMiA3Ny44NjIgQyAxNTYuNDI3IDc4LjM0NCwxNTYuNDYxIDkyLjEwOSwxNTYuODM3IDkyLjIzNCBDIDE1Ni45OTIgOTIuMjg2LDE1Ny4xMTkgOTIuNjIxLDE1Ny4xMTkgOTIuOTgwIEMgMTU3LjExOSA5My45NTEsMTU3LjYzNyA5Ni43OTIsMTU3LjgxNCA5Ni43OTIgQyAxNTcuODk5IDk2Ljc5MiwxNTguMDM2IDk3LjI0NiwxNTguMTE5IDk3LjgwMCBDIDE1OC4yMDIgOTguMzU0LDE1OC4zNDggOTguODU2LDE1OC40NDQgOTguOTE1IEMgMTU4LjUzOSA5OC45NzQsMTU4Ljc1MiA5OS41ODQsMTU4LjkxNyAxMDAuMjcxIEMgMTU5LjA4MiAxMDAuOTU4LDE1OS4yOTAgMTAxLjUxOSwxNTkuMzgxIDEwMS41MTkgQyAxNTkuNDcxIDEwMS41MTksMTU5LjYxMSAxMDEuODc0LDE1OS42OTMgMTAyLjMwNyBDIDE1OS43NzQgMTAyLjc0MSwxNTkuOTMzIDEwMy4wOTUsMTYwLjA0NiAxMDMuMDk1IEMgMTYwLjE1OSAxMDMuMDk1LDE2MC4zNzMgMTAzLjUwMCwxNjAuNTIyIDEwMy45OTUgQyAxNjAuNjcwIDEwNC40OTEsMTYwLjg2NCAxMDQuODk2LDE2MC45NTMgMTA0Ljg5NiBDIDE2MS4wNDIgMTA0Ljg5NiwxNjEuMTczIDEwNS4xODgsMTYxLjI0NCAxMDUuNTQ0IEMgMTYxLjMxNSAxMDUuOTAxLDE2MS41MzAgMTA2LjM0OSwxNjEuNzIyIDEwNi41NDEgQyAxNjEuOTE0IDEwNi43MzMsMTYyLjA3MSAxMDcuMDAxLDE2Mi4wNzEgMTA3LjEzOCBDIDE2Mi4wNzEgMTA3LjI3NCwxNjIuMjE3IDEwNy40NDIsMTYyLjM5NSAxMDcuNTEwIEMgMTYyLjU3MyAxMDcuNTc5LDE2Mi43ODUgMTA3LjkzNywxNjIuODY2IDEwOC4zMDYgQyAxNjIuOTQ3IDEwOC42NzYsMTYzLjE1NiAxMDkuMDMzLDE2My4zMzAgMTA5LjEwMCBDIDE2My41MDQgMTA5LjE2NiwxNjMuNjQ3IDEwOS4zNDEsMTYzLjY0NyAxMDkuNDg5IEMgMTYzLjY0NyAxMDkuNzY0LDE2NC4xMzIgMTEwLjQ3NiwxNjQuODI4IDExMS4yMjUgQyAxNjUuMDQ1IDExMS40NTgsMTY1LjIyMiAxMTEuNzExLDE2NS4yMjIgMTExLjc4NiBDIDE2NS4yMjIgMTEyLjIzNiwxNzEuMzI2IDExOC42MjcsMTcxLjc1NSAxMTguNjI3IEMgMTcxLjg0MiAxMTguNjI3LDE3Mi4yNzUgMTE4Ljk1NiwxNzIuNzE3IDExOS4zNTggQyAxNzMuODEwIDEyMC4zNTEsMTc2LjE0MiAxMjIuMDAzLDE3Ni40NTEgMTIyLjAwMyBDIDE3Ni41ODkgMTIyLjAwMywxNzYuNzAyIDEyMi4xMDUsMTc2LjcwMiAxMjIuMjI4IEMgMTc2LjcwMiAxMjIuMzUyLDE3Ni44MTMgMTIyLjQ1NCwxNzYuOTQ5IDEyMi40NTQgQyAxNzcuMDg1IDEyMi40NTQsMTc3LjQ3MSAxMjIuNjQ5LDE3Ny44MDcgMTIyLjg4OSBDIDE3OC4xNDMgMTIzLjEyOCwxNzguNjkwIDEyMy4zOTIsMTc5LjAyMyAxMjMuNDc2IEMgMTc5LjM1NiAxMjMuNTYwLDE3OS42MjkgMTIzLjcxMCwxNzkuNjI5IDEyMy44MTEgQyAxNzkuNjI5IDEyMy45MTIsMTgwLjAwOCAxMjQuMTE4LDE4MC40NzMgMTI0LjI3MCBDIDE4MC45MzcgMTI0LjQyMSwxODEuMzY3IDEyNC42MDYsMTgxLjQyOSAxMjQuNjgxIEMgMTgxLjY4MiAxMjQuOTg4LDE4My43MjQgMTI1Ljg2NSwxODQuNDYzIDEyNS45ODUgQyAxODQuODk5IDEyNi4wNTYsMTg1LjI1NiAxMjYuMjAyLDE4NS4yNTYgMTI2LjMxMCBDIDE4NS4yNTYgMTI2LjQxNywxODUuNDMzIDEyNi41MDYsMTg1LjY1MCAxMjYuNTA3IEMgMTg1Ljg2NyAxMjYuNTA3LDE4Ni4zMjcgMTI2LjY1NiwxODYuNjczIDEyNi44MzYgQyAxODcuMDE5IDEyNy4wMTcsMTg3LjkzMSAxMjcuMjczLDE4OC42OTkgMTI3LjQwNSBDIDE4OS40NjcgMTI3LjUzOCwxOTAuMjk4IDEyNy43MzgsMTkwLjU0NiAxMjcuODUwIEMgMTkyLjY5NCAxMjguODIyLDIwOC40MjQgMTI4LjgzOSwyMDkuMTE2IDEyNy44NzAgQyAyMDkuMTc4IDEyNy43ODMsMjA5Ljk3MyAxMjcuNTgyLDIxMC44ODIgMTI3LjQyMiBDIDIxMS43OTEgMTI3LjI2MywyMTIuODA0IDEyNi45OTIsMjEzLjEzMyAxMjYuODIwIEMgMjEzLjQ2MiAxMjYuNjQ5LDIxMy45MDggMTI2LjUwNywyMTQuMTI1IDEyNi41MDcgQyAyMTQuMzQyIDEyNi41MDYsMjE0LjUxOSAxMjYuNDIwLDIxNC41MTkgMTI2LjMxNiBDIDIxNC41MTkgMTI2LjIxMiwyMTUuMDc2IDEyNi4wMDIsMjE1Ljc1NyAxMjUuODUwIEMgMjE2LjQzOCAxMjUuNjk3LDIxNi45OTUgMTI1LjQ4NywyMTYuOTk1IDEyNS4zODIgQyAyMTYuOTk1IDEyNS4yNzcsMjE3LjI5OSAxMjUuMTI0LDIxNy42NzAgMTI1LjA0MiBDIDIxOC4wNDIgMTI0Ljk2MSwyMTguMzQ2IDEyNC44MDUsMjE4LjM0NiAxMjQuNjk2IEMgMjE4LjM0NiAxMjQuNTg3LDIxOC43NTEgMTI0LjM3NiwyMTkuMjQ2IDEyNC4yMjggQyAyMTkuNzQxIDEyNC4wNzksMjIwLjE0NiAxMjMuODgxLDIyMC4xNDYgMTIzLjc4NiBDIDIyMC4xNDYgMTIzLjY5MiwyMjAuNDQ5IDEyMy41NDgsMjIwLjgxOSAxMjMuNDY3IEMgMjIxLjE4OSAxMjMuMzg2LDIyMS41NDYgMTIzLjIzMiwyMjEuNjEyIDEyMy4xMjUgQyAyMjEuNjc4IDEyMy4wMTksMjIyLjMxMiAxMjIuNjAwLDIyMy4wMjEgMTIyLjE5NiBDIDIyMy43MzAgMTIxLjc5MSwyMjQuNDEyIDEyMS4zNzgsMjI0LjUzNiAxMjEuMjc3IEMgMjI0LjY2MCAxMjEuMTc3LDIyNS4wMTAgMTIwLjg4OSwyMjUuMzEzIDEyMC42MzggQyAyMjUuNjE3IDEyMC4zODgsMjI2LjIwMCAxMTkuOTc2LDIyNi42MDggMTE5LjcyNCBDIDIyNy4wMTYgMTE5LjQ3MiwyMjcuMzQ5IDExOS4xNjksMjI3LjM0OSAxMTkuMDUyIEMgMjI3LjM0OSAxMTguOTM0LDIyNy41MjcgMTE4Ljc3NCwyMjcuNzQzIDExOC42OTUgQyAyMjguMTA4IDExOC41NjMsMjMwLjI3OSAxMTYuNTk0LDIzMS4xNDAgMTE1LjYxNCBDIDIzMS4zNDYgMTE1LjM4MCwyMzEuODAzIDExNC45MjQsMjMyLjE1NSAxMTQuNjAxIEMgMjMyLjUwOCAxMTQuMjc3LDIzMy4yNjIgMTEzLjM3OSwyMzMuODMxIDExMi42MDYgQyAyMzQuMzk5IDExMS44MzIsMjM0LjkzOSAxMTEuMTk5LDIzNS4wMzEgMTExLjE5OSBDIDIzNS4xMjMgMTExLjE5OSwyMzUuMjYyIDExMC45OTcsMjM1LjM0MCAxMTAuNzUwIEMgMjM1LjQxOCAxMTAuNTAzLDIzNS42MDIgMTEwLjE2OSwyMzUuNzQ5IDExMC4wMDkgQyAyMzYuMTQzIDEwOS41NzgsMjM2LjU0NiAxMDguOTI2LDIzNi45MTUgMTA4LjEyNCBDIDIzNy4wOTUgMTA3LjczMywyMzcuMzIxIDEwNy4zNzksMjM3LjQxNyAxMDcuMzM2IEMgMjM3LjYzOSAxMDcuMjM4LDIzOC44MjkgMTA0Ljg2MywyMzguODI5IDEwNC41MTcgQyAyMzguODI5IDEwNC4zNzUsMjM4LjkwNSAxMDQuMjI0LDIzOC45OTggMTA0LjE4MyBDIDIzOS4yNDIgMTA0LjA3NSwyNDAuMTM0IDEwMi4yMDAsMjQwLjMxOSAxMDEuNDA3IEMgMjQwLjQwNSAxMDEuMDM1LDI0MC42MDcgMTAwLjUyOSwyNDAuNzY3IDEwMC4yODEgQyAyNDAuOTI3IDEwMC4wMzQsMjQxLjEyNiA5OS40MDEsMjQxLjIxMCA5OC44NzUgQyAyNDEuMjk0IDk4LjM0OCwyNDEuNDQyIDk3LjkxOCwyNDEuNTM4IDk3LjkxOCBDIDI0MS42MzUgOTcuOTE4LDI0MS43ODYgOTcuMzg2LDI0MS44NzQgOTYuNzM2IEMgMjQxLjk2MyA5Ni4wODYsMjQyLjEyNiA5NS40OTcsMjQyLjIzNyA5NS40MjYgQyAyNDIuMzQ4IDk1LjM1NiwyNDIuNTU3IDk0LjE2NiwyNDIuNzAyIDkyLjc4MSBDIDI0Mi44NDYgOTEuMzk3LDI0My4wNDcgOTAuMjY0LDI0My4xNDggOTAuMjY0IEMgMjQzLjM5NiA5MC4yNjQsMjQzLjM4MyA4MC4yODIsMjQzLjEzNSA4MC4wMTEgQyAyNDMuMDI4IDc5Ljg5NCwyNDIuODIzIDc4LjczOSwyNDIuNjgxIDc3LjQ0NSBDIDI0Mi41MzkgNzYuMTUwLDI0Mi4zMzUgNzUuMDM2LDI0Mi4yMjkgNzQuOTY4IEMgMjQyLjEyMiA3NC45MDEsMjQxLjk2MyA3NC4zMTMsMjQxLjg3NCA3My42NjMgQyAyNDEuNzg2IDczLjAxNCwyNDEuNjQyIDcyLjQ4MiwyNDEuNTU1IDcyLjQ4MiBDIDI0MS40NjcgNzIuNDgyLDI0MS4yNzAgNzEuODc0LDI0MS4xMTcgNzEuMTMxIEMgMjQwLjk2MyA3MC4zODgsMjQwLjc1MyA2OS43ODEsMjQwLjY1MCA2OS43ODEgQyAyNDAuNTQ2IDY5Ljc4MSwyNDAuMzk3IDY5LjQ1MSwyNDAuMzE4IDY5LjA0OSBDIDI0MC4xNjIgNjguMjUyLDIzOS4yNzAgNjYuMzM3LDIzOC45OTggNjYuMjE2IEMgMjM4LjkwNSA2Ni4xNzUsMjM4LjgyOSA2Ni4wMjUsMjM4LjgyOSA2NS44ODIgQyAyMzguODI5IDY1LjYyMywyMzcuNzQ1IDYzLjM0MSwyMzcuNDE5IDYyLjkxNSBDIDIzNi44OTYgNjIuMjMwLDIzNi4xMjggNjAuOTUyLDIzNi4xMjggNjAuNzY3IEMgMjM2LjEyOCA2MC42NDgsMjM2LjAzOSA2MC41NTEsMjM1LjkzMSA2MC41NTEgQyAyMzUuODIyIDYwLjU1MSwyMzUuNjA3IDYwLjI0OCwyMzUuNDUzIDU5Ljg3NiBDIDIzNS4yOTkgNTkuNTA1LDIzNS4xMDQgNTkuMjAxLDIzNS4wMTkgNTkuMjAxIEMgMjM0LjkzNCA1OS4yMDEsMjM0LjM5OSA1OC41NjgsMjMzLjgzMSA1Ny43OTQgQyAyMzMuMjYyIDU3LjAyMCwyMzIuNTA4IDU2LjEyMiwyMzIuMTU1IDU1Ljc5OSBDIDIzMS44MDMgNTUuNDc1LDIzMS4zNDggNTUuMDE5LDIzMS4xNDYgNTQuNzg2IEMgMjMwLjI5NSA1My44MDMsMjI2LjU1MiA1MC40MjIsMjI2LjMxNSA1MC40MjIgQyAyMjYuMjM5IDUwLjQyMiwyMjUuODU4IDUwLjE2NywyMjUuNDY5IDQ5Ljg1NiBDIDIyNS4wNzkgNDkuNTQ1LDIyNC42NTMgNDkuMjA0LDIyNC41MjIgNDkuMDk5IEMgMjI0LjM5MCA0OC45OTMsMjI0LjAzOCA0OC43NzYsMjIzLjczOCA0OC42MTYgQyAyMjMuNDM5IDQ4LjQ1NiwyMjMuMDU4IDQ4LjE4OSwyMjIuODkyIDQ4LjAyMyBDIDIyMi43MjYgNDcuODU3LDIyMi40NDYgNDcuNzIxLDIyMi4yNjkgNDcuNzIxIEMgMjIyLjA5MiA0Ny43MjEsMjIxLjk0NyA0Ny42MjYsMjIxLjk0NyA0Ny41MTAgQyAyMjEuOTQ3IDQ3LjM5NSwyMjEuNTkzIDQ3LjE3MiwyMjEuMTU5IDQ3LjAxNSBDIDIyMC43MjYgNDYuODU4LDIyMC4zNzEgNDYuNjQ5LDIyMC4zNzEgNDYuNTUwIEMgMjIwLjM3MSA0Ni40NTEsMjIwLjIyNSA0Ni4zNzAsMjIwLjA0NiA0Ni4zNzAgQyAyMTkuODY3IDQ2LjM3MCwyMTkuMjQ0IDQ2LjExNywyMTguNjYyIDQ1LjgwOCBDIDIxOC4wNzkgNDUuNDk4LDIxNy40NjYgNDUuMjQ1LDIxNy4yOTkgNDUuMjQ1IEMgMjE3LjEzMiA0NS4yNDUsMjE2Ljk5NSA0NS4xNTEsMjE2Ljk5NSA0NS4wMzYgQyAyMTYuOTk1IDQ0LjkyMSwyMTYuNDM4IDQ0LjcwMiwyMTUuNzU3IDQ0LjU1MCBDIDIxNS4wNzYgNDQuMzk3LDIxNC41MTkgNDQuMTk2LDIxNC41MTkgNDQuMTAzIEMgMjE0LjUxOSA0NC4wMTAsMjE0LjExNCA0My44NjUsMjEzLjYxOCA0My43ODIgQyAyMTMuMTIzIDQzLjY5OCwyMTIuNzE4IDQzLjU0OSwyMTIuNzE4IDQzLjQ1MSBDIDIxMi43MTggNDMuMzUzLDIxMS45MDggNDMuMTQxLDIxMC45MTcgNDIuOTgwIEMgMjA5LjkyNyA0Mi44MTksMjA5LjExNiA0Mi42MTQsMjA5LjExNiA0Mi41MjQgQyAyMDkuMTE2IDQyLjQzNCwyMDguMTU0IDQyLjI4OCwyMDYuOTc4IDQyLjIwMCBDIDIwNS44MDIgNDIuMTEyLDIwNC44NDAgNDEuOTUxLDIwNC44NDAgNDEuODQyIEMgMjA0Ljg0MCA0MS43MzIsMjAyLjYxMSA0MS42NDMsMTk5Ljg4NyA0MS42NDMgQyAxOTcuMTM1IDQxLjY0MywxOTQuOTM1IDQxLjczMiwxOTQuOTM1IDQxLjg0NCBNMjA3LjA5MSA0Ni4zMjUgQyAyMzEuMjcyIDUxLjU3MCwyNDQuOTI4IDc0Ljk3NSwyMzcuMjI0IDk3Ljk3MSBDIDIyNy45OTEgMTI1LjUzMSwxOTIuMjQ5IDEzMy43MjYsMTcxLjgxOCAxMTIuOTY4IEMgMTQ5LjE5NiA4OS45ODUsMTYxLjk3NCA1MS4xNjEsMTkzLjgxMCA0Ni4xNDUgQyAxOTQuNzM4IDQ1Ljk5OSwxOTUuNjUwIDQ1Ljg0NCwxOTUuODM2IDQ1LjgwMSBDIDE5Ny4wMjkgNDUuNTIyLDIwNS4xMjUgNDUuODk5LDIwNy4wOTEgNDYuMzI1ICIgc3Ryb2tlPSJub25lIiBmaWxsPSIjMWMzNTFjIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBpZD0icGF0aDIiIGQ9Ik0xOTcuODMyIDc0LjUzMyBDIDE4OS41NTQgNzYuMTI3LDE4OC41MzEgOTIuNDQyLDE5Ni40ODMgOTYuMDY5IEMgMTk4LjUxOCA5Ni45OTcsMjAyLjU3NCA5Ni45NTQsMjA0LjYxNSA5NS45ODQgQyAyMDguNzc1IDk0LjAwNSwyMTAuNzQ3IDg4LjczOCwyMDkuNjY0IDgyLjQ5OSBDIDIwOC41NTkgNzYuMTMwLDIwNC4zMjkgNzMuMjgzLDE5Ny44MzIgNzQuNTMzIE0xNzMuODMwIDc1LjM1MiBDIDE3My4xOTYgNzUuODE2LDE3MS41NTcgNzYuOTg2LDE3MC4xODggNzcuOTUzIEwgMTY3LjY5OCA3OS43MTAgMTY3LjY5OCA4Mi4yOTkgQyAxNjcuNjk4IDg0LjMwOSwxNjcuNzYxIDg0Ljg1MiwxNjcuOTgwIDg0LjcyMyBDIDE2OC4yMjIgODQuNTgwLDE3MS4zNDQgODIuNDQxLDE3Mi42NjEgODEuNTE0IEMgMTczLjA5NSA4MS4yMTAsMTczLjEwMSA4MS4zMTQsMTczLjEwMSA4OC44ODYgTCAxNzMuMTAxIDk2LjU2NyAxNzYuMDI3IDk2LjU2NyBMIDE3OC45NTMgOTYuNTY3IDE3OC45NTMgODUuNTM3IEwgMTc4Ljk1MyA3NC41MDggMTc2Ljk2OCA3NC41MDggQyAxNzUuMDI5IDc0LjUwOCwxNzQuOTU2IDc0LjUyNywxNzMuODMwIDc1LjM1MiBNMjE4LjkwOSA3Ni41OTAgQyAyMTcuODcxIDc4LjU5OSwyMTcuMTIzIDgwLjAxNywyMTUuMDgxIDgzLjg0OSBDIDIxMi4xMTMgODkuNDE3LDIxMi4yNjggODkuMDM5LDIxMi4yNjggOTAuNzIwIEwgMjEyLjI2OCA5Mi4yODMgMjE3Ljk1MiA5Mi4zNDMgTCAyMjMuNjM1IDkyLjQwMyAyMjMuNzAwIDk0LjQ4NSBMIDIyMy43NjUgOTYuNTY3IDIyNi4zNDUgOTYuNTY3IEwgMjI4LjkyNSA5Ni41NjcgMjI4LjkyNSA5NC40MjkgTCAyMjguOTI1IDkyLjI5MCAyMzAuMzg4IDkyLjI5MCBMIDIzMS44NTEgOTIuMjkwIDIzMS44NTEgOTAuMTYzIEwgMjMxLjg1MSA4OC4wMzUgMjMwLjQ0NSA4Ny45NjggTCAyMjkuMDM4IDg3LjkwMSAyMjguOTI1IDg0Ljk3NSBMIDIyOC44MTMgODIuMDQ4IDIyNi41NTUgODEuOTg1IEwgMjI0LjI5NyA4MS45MjEgMjI0LjAyMyA4NC4yMzYgQyAyMjMuODcxIDg1LjUwOSwyMjMuNzQ4IDg2LjgxOCwyMjMuNzQ4IDg3LjE0NSBDIDIyMy43NDggODcuOTA5LDIyMy40MzggODguMDE0LDIyMS4xOTcgODguMDEwIEMgMjE4LjUwOSA4OC4wMDUsMjE4LjQ4MiA4Ny45NjEsMjE5LjcyMCA4NS42MDEgQyAyMjAuMjkwIDg0LjUxNCwyMjEuNDk1IDgyLjIwNiwyMjIuMzk4IDgwLjQ3MyBDIDIyMy4zMDEgNzguNzM5LDIyNC4zNzggNzYuNjg4LDIyNC43OTEgNzUuOTE0IEwgMjI1LjU0MyA3NC41MDggMjIyLjc2NCA3NC41MDggTCAyMTkuOTg1IDc0LjUwOCAyMTguOTA5IDc2LjU5MCBNMjAxLjQ3NiA3OS4wMDkgQyAyMDMuNDIxIDc5LjU1MCwyMDQuMjE4IDgxLjQ0MiwyMDQuMjEwIDg1LjUwMCBDIDIwNC4xOTggOTAuOTM5LDIwMi4wNzEgOTMuNDM0LDE5OC45MDIgOTEuNzI3IEMgMTk1LjQzNyA4OS44NjEsMTk2LjEyOSA3OS43MjksMTk5Ljc3NSA3OC45MzUgQyAyMDAuNTE5IDc4Ljc3MywyMDAuNjQzIDc4Ljc3OCwyMDEuNDc2IDc5LjAwOSBNMTg0LjQ4NyA5MC40NDMgQyAxODEuNTI3IDkxLjQ3MCwxODEuNjQ3IDk1Ljc3NywxODQuNjU3IDk2LjU4OCBDIDE4Ny41NjEgOTcuMzcwLDE4OS45NTUgOTUuMzk5LDE4OS40NDAgOTIuNjUxIEMgMTg5LjA1OSA5MC42MjIsMTg2LjgzMiA4OS42MjksMTg0LjQ4NyA5MC40NDMgIiBzdHJva2U9Im5vbmUiIGZpbGw9IiNlYmZiZWIiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjxwYXRoIGlkPSJwYXRoMyIgZD0iTTE5OC4yMTEgNzQuMjUzIEMgMTk3Ljg0NiA3NC4zMzEsMTk4LjgzOSA3NC4zOTUsMjAwLjQxNyA3NC4zOTUgQyAyMDEuOTk2IDc0LjM5NSwyMDMuMDU0IDc0LjMyOSwyMDIuNzY5IDc0LjI0OSBDIDIwMi4xMTEgNzQuMDYzLDE5OS4wODUgNzQuMDY2LDE5OC4yMTEgNzQuMjUzIE0xNzYuOTgyIDc0LjQ0NSBMIDE3OC45NDkgNzQuNTI1IDE3OS4wMTEgODUuNDkwIEwgMTc5LjA3MiA5Ni40NTUgMTc5LjA2OSA4NS40MjUgTCAxNzkuMDY2IDc0LjM5NSAxNzcuMDQwIDc0LjM4MCBMIDE3NS4wMTQgNzQuMzY2IDE3Ni45ODIgNzQuNDQ1IE0yMjEuNDQxIDc0LjQ0OSBDIDIyMi4yMTQgNzQuNDkzLDIyMy40ODEgNzQuNDkzLDIyNC4yNTQgNzQuNDQ5IEMgMjI1LjAyOCA3NC40MDUsMjI0LjM5NSA3NC4zNjksMjIyLjg0NyA3NC4zNjkgQyAyMjEuMzAwIDc0LjM2OSwyMjAuNjY3IDc0LjQwNSwyMjEuNDQxIDc0LjQ0OSBNMTk1Ljc3OSA3NS4wODcgQyAxOTQuOTM4IDc1LjU0MywxOTQuOTg5IDc1LjczMywxOTUuODM2IDc1LjI5NSBDIDE5Ni4yMDcgNzUuMTAzLDE5Ni41MTEgNzQuODk4LDE5Ni41MTEgNzQuODM5IEMgMTk2LjUxMSA3NC42OTUsMTk2LjQ4NyA3NC43MDMsMTk1Ljc3OSA3NS4wODcgTTIwNS43NDAgNzUuNDU4IEMgMjA1Ljc0MCA3NS41MDIsMjA2LjIyMSA3NS45MzMsMjA2LjgwOSA3Ni40MTcgQyAyMDcuMzk3IDc2LjkwMCwyMDcuNjc2IDc3LjA2MiwyMDcuNDI4IDc2Ljc3OCBDIDIwNi45OTEgNzYuMjc0LDIwNS43NDAgNzUuMjk2LDIwNS43NDAgNzUuNDU4IE0xOTMuOTEyIDc2LjU5MCBMIDE5My4wMjIgNzcuNTQ2IDE5My45NzkgNzYuNjU3IEMgMTk0LjUwNSA3Ni4xNjcsMTk0LjkzNSA3NS43MzcsMTk0LjkzNSA3NS43MDAgQyAxOTQuOTM1IDc1LjUzMCwxOTQuNzM5IDc1LjcwMCwxOTMuOTEyIDc2LjU5MCBNMjI0LjA4NiA3Ny4yMDkgQyAyMjMuODkzIDc3LjU4MCwyMjMuNzg3IDc3Ljg4NCwyMjMuODQ5IDc3Ljg4NCBDIDIyMy45MTEgNzcuODg0LDIyNC4xMTkgNzcuNTgwLDIyNC4zMTEgNzcuMjA5IEMgMjI0LjUwMyA3Ni44MzcsMjI0LjYwOSA3Ni41MzMsMjI0LjU0NyA3Ni41MzMgQyAyMjQuNDg1IDc2LjUzMywyMjQuMjc4IDc2LjgzNywyMjQuMDg2IDc3LjIwOSBNMTcwLjUxMiA3Ny41NjYgTCAxNjkuODM3IDc4LjE0NiAxNzAuNTY4IDc3LjY2MiBDIDE3MC45NzEgNzcuMzk2LDE3MS4zMDAgNzcuMTM0LDE3MS4zMDAgNzcuMDgxIEMgMTcxLjMwMCA3Ni45MTIsMTcxLjIwNSA3Ni45NzEsMTcwLjUxMiA3Ny41NjYgTTIxNy41NTggNzguNzg0IEMgMjE3LjM2NiA3OS4xNTYsMjE3LjI1OSA3OS40NjAsMjE3LjMyMSA3OS40NjAgQyAyMTcuMzgzIDc5LjQ2MCwyMTcuNTkxIDc5LjE1NiwyMTcuNzgzIDc4Ljc4NCBDIDIxNy45NzUgNzguNDEzLDIxOC4wODEgNzguMTA5LDIxOC4wMTkgNzguMTA5IEMgMjE3Ljk1OCA3OC4xMDksMjE3Ljc1MCA3OC40MTMsMjE3LjU1OCA3OC43ODQgTTE2OC4yMDUgNzkuMTQxIEwgMTY3LjQ3MyA3OS43MTcgMTY3LjQ3MyA4Mi40MDIgQyAxNjcuNDczIDgzLjg3OSwxNjcuNTUxIDg1LjA4NywxNjcuNjQ2IDg1LjA4NyBDIDE2Ny44NjcgODUuMDg3LDE2OS40OTkgODMuOTgzLDE2OS40OTkgODMuODMzIEMgMTY5LjQ5OSA4My43NzEsMTY5LjExOSA4My45NzksMTY4LjY1NSA4NC4yOTUgTCAxNjcuODExIDg0Ljg2OSAxNjcuNzQ3IDgyLjMzNCBMIDE2Ny42ODMgNzkuNzk5IDE2OC40MjIgNzkuMTg1IEMgMTY5LjM1OSA3OC40MDcsMTY5LjE4MiA3OC4zNzEsMTY4LjIwNSA3OS4xNDEgTTIwOC44MzIgNzkuNDYyIEMgMjA5LjAyNyA3OS45NTksMjA5LjIyNyA4MC4zMjQsMjA5LjI3NyA4MC4yNzQgQyAyMDkuMzg2IDgwLjE2NiwyMDguNzM2IDc4LjU1OSwyMDguNTgzIDc4LjU1OSBDIDIwOC41MjUgNzguNTU5LDIwOC42MzcgNzguOTY2LDIwOC44MzIgNzkuNDYyIE0yMDIuMDU2IDc5LjQ0MSBDIDIwMi40NDQgNzkuNjc4LDIwMi45MjUgODAuMTA1LDIwMy4xMjUgODAuMzkxIEMgMjAzLjMyNSA4MC42NzcsMjAzLjQ4OSA4MC43OTcsMjAzLjQ4OSA4MC42NTkgQyAyMDMuNDg5IDgwLjMzNywyMDEuOTg3IDc5LjAwOSwyMDEuNjI0IDc5LjAxMCBDIDIwMS40NzQgNzkuMDExLDIwMS42NjggNzkuMjA1LDIwMi4wNTYgNzkuNDQxIE0xOTcuNTEzIDgwLjgzMSBDIDE5Ny4zMTUgODEuMjE0LDE5Ny4xOTMgODEuNTY3LDE5Ny4yNDIgODEuNjE2IEMgMTk3LjI5MSA4MS42NjUsMTk3LjQ5OSA4MS4zNTIsMTk3LjcwNSA4MC45MjAgQyAxOTguMTY4IDc5Ljk0OSwxOTguMDA4IDc5Ljg3NSwxOTcuNTEzIDgwLjgzMSBNMjIxLjYwOSA4MS45MzYgQyAyMjEuNDE3IDgyLjMwNywyMjEuMzExIDgyLjYxMSwyMjEuMzczIDgyLjYxMSBDIDIyMS40MzUgODIuNjExLDIyMS42NDIgODIuMzA3LDIyMS44MzUgODEuOTM2IEMgMjIyLjAyNyA4MS41NjQsMjIyLjEzMyA4MS4yNjEsMjIyLjA3MSA4MS4yNjEgQyAyMjIuMDA5IDgxLjI2MSwyMjEuODAyIDgxLjU2NCwyMjEuNjA5IDgxLjkzNiBNMjAzLjg3MyA4Mi42MjMgQyAyMDMuOTQ0IDgzLjE3NCwyMDQuMDM4IDgzLjY2NiwyMDQuMDgzIDgzLjcxOCBDIDIwNC4yNjYgODMuOTI5LDIwNC4xNDIgODIuMjQ4LDIwMy45NTEgODEuOTQ4IEMgMjAzLjgxOCA4MS43MzcsMjAzLjc5MCA4MS45NzUsMjAzLjg3MyA4Mi42MjMgTTIyNC4wMzcgODIuOTQ5IEMgMjI0LjAzOSA4My41NjgsMjI0LjA4MyA4My43OTQsMjI0LjEzNSA4My40NTIgQyAyMjQuMTg2IDgzLjExMCwyMjQuMTg1IDgyLjYwNCwyMjQuMTMxIDgyLjMyNyBDIDIyNC4wNzggODIuMDUwLDIyNC4wMzYgODIuMzMwLDIyNC4wMzcgODIuOTQ5IE0xOTEuMDI3IDgzLjQzMCBDIDE5MC44NTAgODQuNzE5LDE5MC44NjcgODYuNDUwLDE5MS4wNzEgODcuNzg4IEMgMTkxLjE2NiA4OC40MTQsMTkxLjIyNCA4Ny41NzMsMTkxLjIyMyA4NS41OTQgQyAxOTEuMjIxIDgxLjk4MiwxOTEuMjIzIDgyLjAwMCwxOTEuMDI3IDgzLjQzMCBNMTk2LjgyMSA4NS41MzcgQyAxOTYuODIxIDg2Ljk2MSwxOTYuODU4IDg3LjU0NCwxOTYuOTAyIDg2LjgzMiBDIDE5Ni45NDcgODYuMTIwLDE5Ni45NDcgODQuOTU1LDE5Ni45MDIgODQuMjQzIEMgMTk2Ljg1OCA4My41MzEsMTk2LjgyMSA4NC4xMTQsMTk2LjgyMSA4NS41MzcgTTIyMy44MDAgODQuODYyIEMgMjIzLjgwMCA4NS4yOTUsMjIzLjg0NiA4NS40NzMsMjIzLjkwMyA4NS4yNTYgQyAyMjMuOTYwIDg1LjAzOSwyMjMuOTYwIDg0LjY4NSwyMjMuOTAzIDg0LjQ2OCBDIDIyMy44NDYgODQuMjUyLDIyMy44MDAgODQuNDI5LDIyMy44MDAgODQuODYyIE0yMTMuNTA2IDg2LjQzOCBDIDIxMy4zMTQgODYuODA5LDIxMy4yMDcgODcuMTEzLDIxMy4yNjkgODcuMTEzIEMgMjEzLjMzMSA4Ny4xMTMsMjEzLjUzOSA4Ni44MDksMjEzLjczMSA4Ni40MzggQyAyMTMuOTIzIDg2LjA2NiwyMTQuMDMwIDg1Ljc2MywyMTMuOTY4IDg1Ljc2MyBDIDIxMy45MDYgODUuNzYzLDIxMy42OTggODYuMDY2LDIxMy41MDYgODYuNDM4IE0yMDMuOTcyIDg3LjY3NiBDIDIwMy45NTEgODguMDQ3LDIwMy44ODEgODguNjA0LDIwMy44MTcgODguOTE0IEwgMjAzLjcwMSA4OS40NzcgMjAzLjk0NCA4OC45MjIgQyAyMDQuMDc3IDg4LjYxNywyMDQuMTQ2IDg4LjA1OSwyMDQuMDk4IDg3LjY4NCBMIDIwNC4wMTEgODcuMDAxIDIwMy45NzIgODcuNjc2IE0yMDkuNjc5IDg4LjIzOSBDIDIwOS41OTIgODguODczLDIwOS41NjggODkuNDQwLDIwOS42MjYgODkuNDk5IEMgMjA5LjY4NCA4OS41NTcsMjA5LjgwMSA4OS4wODMsMjA5Ljg4NiA4OC40NDUgQyAyMDkuOTcwIDg3LjgwNywyMDkuOTk0IDg3LjI0MCwyMDkuOTM5IDg3LjE4NSBDIDIwOS44ODMgODcuMTMwLDIwOS43NjcgODcuNjA0LDIwOS42NzkgODguMjM5IE0yMjguOTgyIDg3LjU2MyBDIDIyOS4wNTEgODcuODE2LDIyOS40MzcgODcuOTA2LDIzMC41MTkgODcuOTIxIEwgMjMxLjk2NCA4Ny45NDEgMjMwLjYxOSA4Ny44NTIgQyAyMjkuODc5IDg3LjgwMywyMjkuMTg3IDg3LjY0MiwyMjkuMDgyIDg3LjQ5NCBDIDIyOC45NDggODcuMzA2LDIyOC45MTggODcuMzI3LDIyOC45ODIgODcuNTYzIE0yMjAuMjAzIDg3Ljk1NCBDIDIyMC43OTEgODguMDAwLDIyMS43NTMgODguMDAwLDIyMi4zNDEgODcuOTU0IEMgMjIyLjkyOSA4Ny45MDcsMjIyLjQ0OCA4Ny44NzAsMjIxLjI3MiA4Ny44NzAgQyAyMjAuMDk2IDg3Ljg3MCwyMTkuNjE1IDg3LjkwNywyMjAuMjAzIDg3Ljk1NCBNMjEyLjEzOCA5MC43MTUgTCAyMTIuMTU1IDkyLjQwMyAyMTcuODMxIDkyLjQ2MyBMIDIyMy41MDYgOTIuNTIzIDIyMy41ODMgOTQuNDg5IEwgMjIzLjY2MSA5Ni40NTUgMjIzLjY0OCA5NC40MjkgTCAyMjMuNjM1IDkyLjQwMyAyMTcuOTYxIDkyLjM0MyBMIDIxMi4yODcgOTIuMjgzIDIxMi4yMDQgOTAuNjU1IEwgMjEyLjEyMSA4OS4wMjYgMjEyLjEzOCA5MC43MTUgTTE5Ny4yMDIgODkuNDc3IEMgMTk3LjIwMiA4OS42MDAsMTk3LjM0NyA4OS45NTUsMTk3LjUyNCA5MC4yNjQgQyAxOTcuNzAxIDkwLjU3NCwxOTcuODQ2IDkwLjcyNiwxOTcuODQ2IDkwLjYwMiBDIDE5Ny44NDYgOTAuNDc4LDE5Ny43MDEgOTAuMTI0LDE5Ny41MjQgODkuODE0IEMgMTk3LjM0NyA4OS41MDUsMTk3LjIwMiA4OS4zNTMsMTk3LjIwMiA4OS40NzcgTTE4NC4xODcgOTAuMjcyIEMgMTgzLjQ3MCA5MC41NTksMTgzLjU1NiA5MC43MzAsMTg0LjI5OSA5MC40OTYgQyAxODUuNTY5IDkwLjA5NCwxODUuNjA3IDkwLjA3NSwxODUuMTQ0IDkwLjA3MSBDIDE4NC44OTYgOTAuMDcwLDE4NC40NjUgOTAuMTYwLDE4NC4xODcgOTAuMjcyIE0yMDEuMjgzIDkxLjgzNyBDIDIwMC44NzQgOTEuOTM0LDIwMC40NzYgOTIuMDc3LDIwMC4zOTkgOTIuMTU0IEMgMjAwLjE4MiA5Mi4zNzEsMjAxLjc3MSA5Mi4wMzMsMjAyLjAxNSA5MS44MTAgQyAyMDIuMTMyIDkxLjcwMywyMDIuMTgzIDkxLjYyNSwyMDIuMTI3IDkxLjYzOCBDIDIwMi4wNzEgOTEuNjUxLDIwMS42OTIgOTEuNzQwLDIwMS4yODMgOTEuODM3IE0xODIuMjQxIDkyLjQyMSBDIDE4Mi4wNjQgOTIuODg0LDE4Mi4wOTMgOTQuMDk0LDE4Mi4yOTQgOTQuNjAyIEMgMTgyLjM4MCA5NC44MjEsMTgyLjQ0OSA5NC4zNDAsMTgyLjQ0NyA5My41MzMgQyAxODIuNDQyIDkxLjkyNCwxODIuNDM5IDkxLjkwNywxODIuMjQxIDkyLjQyMSBNMTg5LjQyMCA5My40MTYgQyAxODkuNDIwIDk0LjEzNSwxODkuNDk1IDk0LjYwNywxODkuNTg2IDk0LjQ2NCBDIDE4OS42NzcgOTQuMzIxLDE4OS43NTEgOTMuODQ5LDE4OS43NTEgOTMuNDE2IEMgMTg5Ljc1MSA5Mi45ODMsMTg5LjY3NyA5Mi41MTEsMTg5LjU4NiA5Mi4zNjggQyAxODkuNDk1IDkyLjIyNSwxODkuNDIwIDkyLjY5NywxODkuNDIwIDkzLjQxNiBNMjI4LjkyNSA5Mi40NjEgQyAyMjguOTI1IDkyLjU1NSwyMjkuNDA2IDkyLjYwMSwyMjkuOTk0IDkyLjU2NCBDIDIzMS44NDQgOTIuNDQ3LDIzMi4wMTkgOTIuMzUzLDIzMC40NDUgOTIuMzIxIEMgMjI5LjYwOSA5Mi4zMDQsMjI4LjkyNSA5Mi4zNjcsMjI4LjkyNSA5Mi40NjEgTTIwNy41NTYgOTMuNzAxIEMgMjA2LjkxNSA5NC40OTEsMjA2Ljg4OSA5NC41NTgsMjA3LjQwOCA5NC4wOTEgQyAyMDcuOTQ2IDkzLjYwNiwyMDguNTg1IDkyLjczMiwyMDguMzkzIDkyLjc0NSBDIDIwOC4zNTggOTIuNzQ3LDIwNy45ODEgOTMuMTc3LDIwNy41NTYgOTMuNzAxIE0xOTMuODEwIDk0LjM5OSBDIDE5NC4yNDMgOTQuODY5LDE5NC44MDAgOTUuMzYwLDE5NS4wNDggOTUuNDkxIEMgMTk1LjI5NSA5NS42MjEsMTk1LjQ0NyA5NS42ODEsMTk1LjM4NSA5NS42MjMgQyAxOTMuOTQ2IDk0LjI4NCwxOTMuMDk0IDkzLjYyMywxOTMuODEwIDk0LjM5OSBNMjA2LjIxOSA5NS4wNjkgQyAyMDYuMDgxIDk1LjIzNiwyMDUuNTYxIDk1LjU1NiwyMDUuMDY0IDk1Ljc4MCBDIDIwNC41NjcgOTYuMDA0LDIwNC4yMDIgOTYuMjI5LDIwNC4yNTMgOTYuMjgxIEMgMjA0LjM5NiA5Ni40MjQsMjA2LjA3MCA5NS41MjAsMjA2LjQwMiA5NS4xMjEgQyAyMDYuNTYzIDk0LjkyNiwyMDYuNjQ1IDk0Ljc2NiwyMDYuNTgzIDk0Ljc2NiBDIDIwNi41MjEgOTQuNzY2LDIwNi4zNTcgOTQuOTAzLDIwNi4yMTkgOTUuMDY5IE0xODguMjk1IDk2LjAzMyBDIDE4Ny44OTAgOTYuMzc3LDE4Ny44MDcgOTYuNTE0LDE4OC4wODggOTYuMzc0IEMgMTg4LjUwMSA5Ni4xNjksMTg5LjI3NSA5NS40MjksMTg5LjA1NCA5NS40NTAgQyAxODkuMDA4IDk1LjQ1NCwxODguNjY2IDk1LjcxNywxODguMjk1IDk2LjAzMyBNMTg0LjY5MyA5Ni43ODYgQyAxODUuMTIzIDk2Ljk3NywxODYuNTU4IDk3LjEwNiwxODYuMzYzIDk2LjkzNiBDIDE4Ni4zMTEgOTYuODkyLDE4NS44MTMgOTYuNzk1LDE4NS4yNTYgOTYuNzIxIEMgMTg0LjU4MCA5Ni42MzIsMTg0LjM5MyA5Ni42NTMsMTg0LjY5MyA5Ni43ODYgTTE5OS44MzEgOTYuOTU1IEMgMjAwLjIzNCA5Ny4wMDUsMjAwLjg5MiA5Ny4wMDUsMjAxLjI5NCA5Ni45NTUgQyAyMDEuNjk3IDk2LjkwNSwyMDEuMzY3IDk2Ljg2NCwyMDAuNTYzIDk2Ljg2NCBDIDE5OS43NTggOTYuODY0LDE5OS40MjkgOTYuOTA1LDE5OS44MzEgOTYuOTU1ICIgc3Ryb2tlPSJub25lIiBmaWxsPSIjYTRkZGE0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48cGF0aCBpZD0icGF0aDQiIGQ9Ik0xNzcuMTUzIDc0LjI2OCBMIDE3OS4wNjYgNzQuMzk1IDE3OS4xOTAgNzYuOTg0IEwgMTc5LjMxNCA3OS41NzIgMTc5LjM1OSA3Ny4wODUgQyAxNzkuNDE0IDc0LjAzNCwxNzkuNDIyIDc0LjA0NCwxNzcuMDUxIDc0LjA5OSBMIDE3NS4yMzkgNzQuMTQxIDE3Ny4xNTMgNzQuMjY4IE0xOTMuNzk4IDc2LjQ3NyBMIDE5My4wMjIgNzcuMzIxIDE5My44NjYgNzYuNTQ2IEMgMTk0LjY1MiA3NS44MjQsMTk0LjgxNCA3NS42MzMsMTk0LjY0MiA3NS42MzMgQyAxOTQuNjA0IDc1LjYzMywxOTQuMjI0IDc2LjAxMywxOTMuNzk4IDc2LjQ3NyBNMTk5LjIzOCA3OS4yMTQgQyAxOTkuMDQ2IDc5LjMzNSwxOTkuMzQ5IDc5LjM3MCwyMDAuMDI2IDc5LjMwNCBDIDIwMS41NTAgNzkuMTU2LDIwMS43NjMgNzkuMDQ4LDIwMC41NjMgNzkuMDMxIEMgMjAwLjAwNiA3OS4wMjMsMTk5LjQxMCA3OS4xMDUsMTk5LjIzOCA3OS4yMTQgTTE3OS4yMzUgODAuNDczIEMgMTc5LjIzOCA4MC45NjgsMTc5LjI4NCA4MS4xNDQsMTc5LjMzOCA4MC44NjQgQyAxNzkuMzkxIDgwLjU4NCwxNzkuMzg5IDgwLjE3OSwxNzkuMzMzIDc5Ljk2NCBDIDE3OS4yNzcgNzkuNzQ4LDE3OS4yMzMgNzkuOTc3LDE3OS4yMzUgODAuNDczIE0yMDIuODk5IDgwLjQ1NCBDIDIwMy4yMjQgODAuOTMyLDIwMy40ODkgODEuNDI3LDIwMy40ODkgODEuNTU1IEMgMjAzLjQ4OSA4MS42ODIsMjAzLjU0NyA4MS43MjgsMjAzLjYxOCA4MS42NTcgQyAyMDMuNzkyIDgxLjQ4MywyMDMuMTYyIDgwLjI5MywyMDIuNjg5IDc5LjkwMCBDIDIwMi40ODAgNzkuNzI2LDIwMi41NzQgNzkuOTc2LDIwMi44OTkgODAuNDU0IE0xOTEuMjQ5IDgxLjE1NyBDIDE5MS4xNzIgODEuMzU4LDE5MS4xMTkgODEuNzQyLDE5MS4xMzIgODIuMDExIEMgMTkxLjE0NiA4Mi4zMTksMTkxLjIyMyA4Mi4yMDksMTkxLjM0MCA4MS43MTIgQyAxOTEuNTM2IDgwLjg3NiwxOTEuNDgzIDgwLjU0OCwxOTEuMjQ5IDgxLjE1NyBNMTc5LjI1NiA4My4zOTkgQyAxNzkuMjU2IDg0LjM4OSwxNzkuMjk2IDg0Ljc2NywxNzkuMzQzIDg0LjIzNyBDIDE3OS4zOTEgODMuNzA4LDE3OS4zOTAgODIuODk3LDE3OS4zNDIgODIuNDM2IEMgMTc5LjI5NCA4MS45NzUsMTc5LjI1NSA4Mi40MDksMTc5LjI1NiA4My4zOTkgTTIyNi40OTggODEuODc1IEwgMjI4LjkxMSA4MS45NTEgMjI4Ljk4NSA4NC41ODggTCAyMjkuMDU4IDg3LjIyNiAyMjkuMDQ4IDg0LjUyNCBMIDIyOS4wMzggODEuODIzIDIyNi41NjIgODEuODExIEwgMjI0LjA4NiA4MS43OTggMjI2LjQ5OCA4MS44NzUgTTIwNC4wMTYgODUuNDI1IEMgMjA0LjAxNyA4Ni40MTUsMjA0LjA1NyA4Ni43OTIsMjA0LjEwNCA4Ni4yNjMgQyAyMDQuMTUyIDg1LjczNCwyMDQuMTUxIDg0LjkyMywyMDQuMTAzIDg0LjQ2MiBDIDIwNC4wNTQgODQuMDAxLDIwNC4wMTYgODQuNDM0LDIwNC4wMTYgODUuNDI1IE0xNzkuMjc2IDkwLjgyNyBDIDE3OS4yNzYgOTMuOTIyLDE3OS4zMDggOTUuMjIwLDE3OS4zNDYgOTMuNzEwIEMgMTc5LjM4NSA5Mi4yMDEsMTc5LjM4NSA4OS42NjksMTc5LjM0NyA4OC4wODMgQyAxNzkuMzA4IDg2LjQ5NywxNzkuMjc2IDg3LjczMiwxNzkuMjc2IDkwLjgyNyBNMjIzLjUyMyA4Ni4zODIgQyAyMjMuNTIzIDg3LjQ4NCwyMjMuMzY5IDg3LjU2MywyMjEuMjIxIDg3LjU2MyBDIDIxOS4zMDQgODcuNTYzLDIxOS4yMDAgODcuNTM5LDIxOS4zMTEgODcuMTEzIEMgMjE5LjM3NiA4Ni44NjUsMjE5LjM0OSA4Ni43MTIsMjE5LjI1MiA4Ni43NzIgQyAyMTguMTk3IDg3LjQyNCwyMTguODg0IDg3Ljc4OCwyMjEuMTcwIDg3Ljc4OCBMIDIyMy41MDIgODcuNzg4IDIyMy42NTIgODYuOTkwIEMgMjIzLjczNSA4Ni41NTEsMjIzLjczOSA4Ni4xMjksMjIzLjY2MiA4Ni4wNTIgQyAyMjMuNTg2IDg1Ljk3NSwyMjMuNTIzIDg2LjEyNCwyMjMuNTIzIDg2LjM4MiBNMjMwLjQzNyA4Ny43MjQgTCAyMzEuODM2IDg3LjgwOSAyMzEuOTEyIDkwLjA1MCBMIDIzMS45ODkgOTIuMjkxIDIzMS45NzYgODkuOTg0IEwgMjMxLjk2NCA4Ny42NzYgMjMwLjUwMSA4Ny42NTcgTCAyMjkuMDM4IDg3LjYzOCAyMzAuNDM3IDg3LjcyNCBNMTkxLjExMiA4OS4xNTggQyAxOTEuMTE0IDg5LjQ1NywxOTEuMjE1IDg5Ljg1NCwxOTEuMzM3IDkwLjAzOSBDIDE5MS40OTMgOTAuMjc3LDE5MS41MTUgOTAuMTQzLDE5MS40MTQgODkuNTg5IEMgMTkxLjIzNSA4OC42MTgsMTkxLjEwNyA4OC40MzUsMTkxLjExMiA4OS4xNTggTTIwOS4zOTAgOTAuNDEyIEMgMjA5LjI1MSA5MC44NjQsMjA5LjIyNyA5MS4xNDIsMjA5LjMzNiA5MS4wMzEgQyAyMDkuNTU2IDkwLjgwNSwyMDkuODk4IDg5LjU4OSwyMDkuNzQxIDg5LjU4OSBDIDIwOS42ODcgODkuNTg5LDIwOS41MjkgODkuOTU5LDIwOS4zOTAgOTAuNDEyIE0yMDMuMjY0IDg5Ljk4NSBDIDIwMy4yNjQgOTAuMTIwLDIwMi45ODkgOTAuNTY3LDIwMi42NTMgOTAuOTc5IEMgMjAyLjE1MCA5MS41OTUsMjAyLjEzNCA5MS42NDgsMjAyLjU2MSA5MS4yODAgQyAyMDMuMTY4IDkwLjc1NywyMDMuNTgyIDkwLjA1NywyMDMuMzk1IDg5Ljg3MCBDIDIwMy4zMjMgODkuNzk4LDIwMy4yNjQgODkuODUwLDIwMy4yNjQgODkuOTg1IE0yMjMuMzk4IDk0LjY1NCBMIDIyMy40MTAgOTYuNjgwIDIyNi4yMjQgOTYuNjgwIEwgMjI5LjAzOCA5Ni42ODAgMjI5LjA1MiA5NC42NTQgTCAyMjkuMDY3IDkyLjYyOCAyMjguOTg3IDk0LjU5OCBMIDIyOC45MDggOTYuNTY3IDIyNi4yMjQgOTYuNTY3IEwgMjIzLjU0MCA5Ni41NjcgMjIzLjQ2MiA5NC41OTggTCAyMjMuMzg1IDkyLjYyOCAyMjMuMzk4IDk0LjY1NCBNMjA3LjA5MSA5NC40MjkgQyAyMDYuNTQ0IDk0Ljk4NiwyMDYuMTQ3IDk1LjQ0MiwyMDYuMjA5IDk1LjQ0MiBDIDIwNi4yNzEgOTUuNDQyLDIwNi43NjkgOTQuOTg2LDIwNy4zMTYgOTQuNDI5IEMgMjA3Ljg2MiA5My44NzIsMjA4LjI1OSA5My40MTYsMjA4LjE5NyA5My40MTYgQyAyMDguMTM1IDkzLjQxNiwyMDcuNjM3IDkzLjg3MiwyMDcuMDkxIDk0LjQyOSBNMTg0LjAwNSA5Ni42NjcgQyAxODQuMjQ1IDk2Ljg2MCwxODQuNjAwIDk3LjAwOSwxODQuNzkzIDk3LjAwMCBDIDE4NS4wOTYgOTYuOTg0LDE4NS4wOTggOTYuOTY1LDE4NC44MDYgOTYuODU3IEMgMTg0LjYyMCA5Ni43ODgsMTg0LjI2NiA5Ni42MzgsMTg0LjAxOCA5Ni41MjQgQyAxODMuNTc1IDk2LjMyMSwxODMuNTc1IDk2LjMyMywxODQuMDA1IDk2LjY2NyBNMTc0LjQ5OCA5Ni43MzQgQyAxNzUuMzI4IDk2Ljc3NywxNzYuNzQ2IDk2Ljc3NywxNzcuNjQ5IDk2LjczNSBDIDE3OC41NTIgOTYuNjkyLDE3Ny44NzMgOTYuNjU2LDE3Ni4xNDAgOTYuNjU2IEMgMTc0LjQwNiA5Ni42NTYsMTczLjY2NyA5Ni42OTEsMTc0LjQ5OCA5Ni43MzQgTTE4Ni44MzIgOTYuNzkyIEMgMTg2LjM2OCA5Ni45NDEsMTg2LjM0OCA5Ni45NzYsMTg2LjcxOSA5Ni45OTIgQyAxODYuOTY3IDk3LjAwMiwxODcuMzIxIDk2LjkxMiwxODcuNTA3IDk2Ljc5MiBDIDE4Ny45MDEgOTYuNTM3LDE4Ny42MjggOTYuNTM3LDE4Ni44MzIgOTYuNzkyICIgc3Ryb2tlPSJub25lIiBmaWxsPSIjOGJkMzhiIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L2c+PC9zdmc+";
  class MubiLopNumberUtilities {
    constructor() {
      // system locale
      this.systemLocale = navigator.language || 'en-US';
    }

    getInfo() {
      return {
        id: 'numberUtilities',
        name: 'Number Utilities',
        menuIconURI: ico,
        blockIconURI: ico,
        color1: '#59c059',
        color2: '#46a346',
        color3: '#389438',
        menus: {
          locales: {
            items: Object.entries(LANGUAGE_CODES).map(([code, name]) => ({ text: name, value: code }))
          },
          currencies: {
            items: Object.entries(CURRENCY_CODES).map(([code, name]) => ({ text: `${code} - ${name}`, value: code }))
          }
        },
        blocks: [
          {
            opcode: 'toLocaleString',
            blockType: BlockType.REPORTER,
            text: 'format number [NUMBER] with locale [LOCALE]',
            arguments: {
              NUMBER: {
                type: ArgumentType.NUMBER,
                defaultValue: 10000
              },
              LOCALE: {
                type: ArgumentType.STRING,
                menu: 'locales',
                defaultValue: 'system'
              }
            }
          },
          {
            opcode: 'toFixed',
            blockType: BlockType.REPORTER,
            text: 'format [NUMBER] with [DECIMALS] decimal places',
            arguments: {
              NUMBER: {
                type: ArgumentType.NUMBER,
                defaultValue: 3.14159
              },
              DECIMALS: {
                type: ArgumentType.NUMBER,
                defaultValue: 2
              }
            }
          },
          {
            opcode: 'toPrecision',
            blockType: BlockType.REPORTER,
            text: 'format [NUMBER] with [PRECISION] significant figures',
            arguments: {
              NUMBER: {
                type: ArgumentType.NUMBER,
                defaultValue: 3.14159
              },
              PRECISION: {
                type: ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          {
            opcode: 'toExponential',
            blockType: BlockType.REPORTER,
            text: 'convert [NUMBER] to exponential notation with [DECIMALS] decimals',
            arguments: {
              NUMBER: {
                type: ArgumentType.NUMBER,
                defaultValue: 1234.5678
              },
              DECIMALS: {
                type: ArgumentType.NUMBER,
                defaultValue: 2
              }
            }
          },
          {
            opcode: 'formatCurrency',
            blockType: BlockType.REPORTER,
            text: 'format [NUMBER] as currency in [CURRENCY]',
            arguments: {
              NUMBER: {
                type: ArgumentType.NUMBER,
                defaultValue: 123.45
              },
              CURRENCY: {
                type: ArgumentType.STRING,
                menu: 'currencies',
                defaultValue: 'USD'
              }
            }
          },
          {
            opcode: 'formatPercentage',
            blockType: BlockType.REPORTER,
            text: 'format [NUMBER] as percentage with [DECIMALS] decimals',
            arguments: {
              NUMBER: {
                type: ArgumentType.NUMBER,
                defaultValue: 0.8547
              },
              DECIMALS: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: 'roundNumber',
            blockType: BlockType.REPORTER,
            text: 'round [NUMBER] to nearest [MULTIPLE]',
            arguments: {
              NUMBER: {
                type: ArgumentType.NUMBER,
                defaultValue: 127
              },
              MULTIPLE: {
                type: ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'isInteger',
            blockType: BlockType.BOOLEAN,
            text: 'is [NUMBER] an integer?',
            arguments: {
              NUMBER: {
                type: ArgumentType.NUMBER,
                defaultValue: 5
              }
            }
          },
          {
            opcode: 'isFinite',
            blockType: BlockType.BOOLEAN,
            text: 'is [NUMBER] finite?',
            arguments: {
              NUMBER: {
                type: ArgumentType.NUMBER,
                defaultValue: 42
              }
            }
          },
          {
            opcode: 'isNaN',
            blockType: BlockType.BOOLEAN,
            text: 'is [NUMBER] NaN?',
            arguments: {
              NUMBER: {
                type: ArgumentType.NUMBER,
                defaultValue: 'NaN'
              }
            }
          },
          {
            opcode: 'parseNumber',
            blockType: BlockType.REPORTER,
            text: 'parse number from text [TEXT]',
            arguments: {
              TEXT: {
                type: ArgumentType.STRING,
                defaultValue: '123.45'
              }
            }
          },
          {
            opcode: 'clamp',
            blockType: BlockType.REPORTER,
            text: 'clamp [NUMBER] between [MIN] and [MAX]',
            arguments: {
              NUMBER: {
                type: ArgumentType.NUMBER,
                defaultValue: 50
              },
              MIN: {
                type: ArgumentType.NUMBER,
                defaultValue: 0
              },
              MAX: {
                type: ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          }
        ]
      };
    }

    toLocaleString(args) {
      try {
        const locale = args.LOCALE === 'system' ? this.systemLocale : args.LOCALE;
        return Number(args.NUMBER).toLocaleString(locale);
      } catch (e) {
        return 'Error: Invalid number or locale';
      }
    }

    toFixed(args) {
      try {
        return Number(args.NUMBER).toFixed(args.DECIMALS);
      } catch (e) {
        return 'Error: Invalid input';
      }
    }

    toPrecision(args) {
      try {
        return Number(args.NUMBER).toPrecision(args.PRECISION);
      } catch (e) {
        return 'Error: Invalid input';
      }
    }

    toExponential(args) {
      try {
        return Number(args.NUMBER).toExponential(args.DECIMALS);
      } catch (e) {
        return 'Error: Invalid input';
      }
    }

    formatCurrency(args) {
      try {
        return Number(args.NUMBER).toLocaleString('en-US', {
          style: 'currency',
          currency: args.CURRENCY
        });
      } catch (e) {
        return 'Error: Invalid input';
      }
    }

    formatPercentage(args) {
      try {
        const number = Number(args.NUMBER);
        return `${(number * 100).toFixed(args.DECIMALS)}%`;
      } catch (e) {
        return 'Error: Invalid input';
      }
    }

    roundNumber(args) {
      try {
        const multiple = Number(args.MULTIPLE);
        return Math.round(args.NUMBER / multiple) * multiple;
      } catch (e) {
        return 'Error: Invalid input';
      }
    }

    isInteger(args) {
      return Number.isInteger(Number(args.NUMBER));
    }

    isFinite(args) {
      return Number.isFinite(Number(args.NUMBER));
    }

    isNaN(args) {
      return Number.isNaN(Number(args.NUMBER));
    }

    parseNumber(args) {
      try {
        const parsed = parseFloat(args.TEXT);
        return Number.isNaN(parsed) ? 'Error: Invalid number' : parsed;
      } catch (e) {
        return 'Error: Invalid input';
      }
    }

    clamp(args) {
      try {
        const num = Number(args.NUMBER);
        const min = Number(args.MIN);
        const max = Number(args.MAX);
        return Math.min(Math.max(num, min), max);
      } catch (e) {
        return 'Error: Invalid input';
      }
    }
  }

  Scratch.extensions.register(new MubiLopNumberUtilities());
})(Scratch);