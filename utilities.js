const jokeButton = document.querySelector("#jokeButton");
const jokeDisplay = document.querySelector("#jokeDisplay");
const soundEffects = [
    new Audio("universfield-fist-fight-192117.mp3"),
    new Audio("freesound_community-karate-chop-6357.mp3"),
    new Audio("universfield-power-punch-192118.mp3")
];
let nextSoundEffect = 0;

function playNextSoundEffect() {
    soundEffects.forEach(sound => {
        sound.pause();
        sound.currentTime = 0;
    });

    const sound = soundEffects[nextSoundEffect];
    nextSoundEffect = (nextSoundEffect + 1) % soundEffects.length;
    sound.play().catch(error => {
        console.error("Could not play the sound effect:", error);
    });
}

jokeButton.addEventListener("click", async () => {
    jokeButton.disabled = true;
    jokeDisplay.textContent = "Punchline inbound...";

    try {
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        if (!response.ok) {
            throw new Error(`Joke wasn't funny (${response.status})`);
        }

        const joke = await response.json();
        jokeDisplay.textContent = joke.value;
        playNextSoundEffect();
    } catch (error) {
        console.error("Error fetching a joke:", error);
        jokeDisplay.textContent = "Chuck didn't laugh. Please try again.";
    } finally {
        jokeButton.disabled = false;
    }
});
