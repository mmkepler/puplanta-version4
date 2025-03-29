const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const { createClient }  = require("@supabase/supabase-js");
require('dotenv').config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

app.use(cors());

  
  //app.use(express.static(path.join(__dirname, "/client/index.html")) )

  app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express!' });
  });

  app.get('/api/parks', async (req, res) => {
    const { data, error } = await supabase.from("parks").select();
    if(error){
      console.log(error);
    }else{
      console.log("parkdata ", data);
      res.send({data})
    }
    

  })

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });