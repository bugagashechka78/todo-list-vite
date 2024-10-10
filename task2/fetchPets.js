async function fetchPets() {
    const url = 'https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("HTTP error! status:", response.status);
        }

        const pets = await response.json();
        console.log(pets);
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

fetchPets();