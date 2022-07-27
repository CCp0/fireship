import express from 'express';
import cors from 'cors';
// Initialize the express app
const app = express();
app.use(cors());
app.use(express.json());

// Make some companies
import Chance from 'chance';
const chance = new Chance();

const companies = [...Array(250).keys()].map(id => {
    return {
        id,
        name: chance.company(),
        age: chance.age(),
        ceo: chance.name(),
        phone: chance.phone()
    }
});

// Endpoint to search for companies
app.get('', (req, res) => {

    // Filter results by query
    const q = req.query.q?.toLowerCase() || '';
    const results = companies.filter(company => company.name.toLowerCase().includes(q));

    res.send(results);

});

app.listen(8080, () => console.log('Listening on port http://localhost:8080'));