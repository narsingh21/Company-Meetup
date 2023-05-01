import React from 'react';
import { MongoClient } from 'mongodb';

const Handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body;
    const { title, image, address, description } = JSON.parse(data);

    const client = await MongoClient.connect(
      'mongodb+srv://Narsingh:12345@cluster0.ytyp2wc.mongodb.net/meetup?retryWrites=true&w=majority'
    );
    const db = client.db();
    const meetupCollection = db.collection('meetup');
    const result = await meetupCollection.insertOne({
      title,
      image,
      address,
      description,
    });
    console.log(data);
    client.close();

    res.status(201).json({ message: 'Meetup Inserted' });
  }
};

export default Handler;
