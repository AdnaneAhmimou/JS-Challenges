const apiUrl = 'https://dummyjson.com/users'


const fetchUserData = async () => {
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.users;
        
    }catch(error){
        console.log(error.message)
    }
}


const processUserData = (data) => {
    const filteredUsers = data.filter(({ gender }) => gender !== 'male')
    const mappedUsers = filteredUsers.map(({ firstName,lastName, age }) => `firstName =  ${firstName}, lastName = ${lastName}, Age = ${age}`);
    return mappedUsers;
}

const summarizeAge = (data) => {
    const totalAge = data.reduce((accumulator, { age }) => accumulator + age, 0);
    return `${totalAge}`;
}

const displayResults = async () => {
    const data = await fetchUserData();
    const processedUsers = processUserData(data);
    const totalAge = summarizeAge(data);

    console.log('Processed Users:');
    processedUsers.forEach(user => console.log(user));
    console.log('Total Age of Active Users:', totalAge);
}

displayResults();