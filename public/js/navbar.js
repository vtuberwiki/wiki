(async function () {
    try {
        const response = await fetch("https://discord.com/api/guilds/1166212127044931718/widget.json");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        const members = data.members.length;

        const element = document.querySelector("#discord-button-navbar");

        function FormatNumber(num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        }

        // element.innerHTML = `Discord Server <span style="color: #dcddde; opacity: 0.9; font-size: 0.9em;">(${FormatNumber(members)})</span></h2>`;
        element.innerHTML = `Discord Server <span style="color: red; opacity: 0.9; font-size: 0.9em;">UNAVAILABLE</span>`;
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();