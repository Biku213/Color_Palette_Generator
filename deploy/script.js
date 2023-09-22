class ColorPaletteGenerator {
    constructor() {
        this.colors = [];
        this.generatePaletteButton = document.getElementById("generatePalette");
        this.colorBoxes = document.querySelectorAll(".color-box");
        this.resultMessage = document.getElementById("resultMessage");
        this.shareButton = document.getElementById("shareButton");

        this.generatePaletteButton.addEventListener("click", () => {
            this.handleUserAction("generatePalette");
        });

        this.shareButton.addEventListener("click", () => {
            this.sharePalette();
        });

        this.generateColorPalette(); // Initial palette generation
    }

    generateRandomColors(count) {
        const randomColors = [];
        for (let i = 0; i < count; i++) {
            const randomColor = "#" + Math.random().toString(16).substr(-6);
            randomColors.push(randomColor);
        }
        return randomColors;
    }

    handleUserAction(action) {
        switch (action) {
            case "generatePalette":
                this.generateColorPalette();
                break;
            case "copyToClipboard":
                // Handle copying to clipboard
                break;
            default:
                console.error("Invalid action.");
        }
    }

    generateColorPalette() {
        try {
            this.colors = this.generateRandomColors(5);
            this.displayPalette();
            this.resultMessage.textContent = "Palette generated successfully.";
        } catch (error) {
            this.resultMessage.textContent = "Error: " + error.message;
        }
    }

    displayPalette() {
        this.colorBoxes.forEach((colorBox, index) => {
            const color = this.colors[index];
            colorBox.style.backgroundColor = color;
            const colorCodeSpan = colorBox.querySelector(".color-code");
            colorCodeSpan.textContent = color;

            const copyButton = colorBox.querySelector(".copy-button");
            copyButton.addEventListener("click", () => {
                const colorCode = colorCodeSpan.textContent; // Get the color code associated with the clicked button
                this.copyToClipboard(colorCode);
                copyButton.textContent = "Copied!";
                setTimeout(() => {
                    copyButton.textContent = "Copy";
                }, 2000);
            });
        });
    }

    copyToClipboard(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    sharePalette() {
        // Encode the color palette data as a JSON string
        const paletteData = JSON.stringify(this.colors);
    
        // Create a unique URL with a hash parameter for the palette data
        const shareURL = `${window.location.origin}/#palette/data=${encodeURIComponent(paletteData)}`;
        
        // Copy the URL to the clipboard
        navigator.clipboard.writeText(shareURL)
            .then(() => {
                this.resultMessage.textContent = "Palette URL copied to clipboard!";
            })
            .catch((error) => {
                console.error("Copy URL failed:", error);
            });
    }
    
}

const paletteGenerator = new ColorPaletteGenerator();
