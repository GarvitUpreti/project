const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());  // Middleware to parse JSON requests

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

let items = [];

app.post('/items', (req, res) => {
  const newItem = {
      id: sorted_pos(items),  // filling the id gaps with sorted_pos
      ...req.body
  };
  items.push(newItem);
  items.sort((a, b) => a.id - b.id);
  res.status(201).send('Item added successfully');
});
  
app.get('/items', (req, res) => {
    console.log(items)
    res.json(items);
});

app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex !== -1) {
    items[itemIndex] = {...items[itemIndex], ...updatedItem};
    res.send('Item updated successfully');
  } else {
    res.status(404).send('Item not found');
  }
});

app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(item => item.id === id);
  
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.send('Item deleted successfully by ID');
  } else {
    res.status(404).send('Item not found');
  }
});

app.delete('/items/name/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const itemIndex = items.findIndex(item => item.name.toLowerCase() === name);
  
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.send('Item deleted successfully by name');
  } else {
    res.status(404).send('Item not found');
  }
});

function sorted_pos(items){
  if (items.length == 0) return 1; // id = 1 if array is emplty

  // Find the 1st missing ID
  for (let i = 0; i < items.length; i++) {
    if (items[i].id !== i + 1) {
      return i + 1; // Return the lost id
    }
  }
  // If no gaps, return the next ID after the last item
  return items.length + 1;
}
  