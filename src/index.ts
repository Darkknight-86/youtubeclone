import express from 'express';
import ffmpeg from 'fluent-ffmpeg'; /* wrapper around ffmpeg cli tool */

const app = express();
app.use(express.json()); // middleware to parse JSON bodies in incoming requests, without this JSON body req on PM won't work

app.post("/process-video", (req: express.Request, res: express.Response): void => { // changed from NC as it was throwing type errors, also had to add : void to match the type signature of the function
    // get path of the input video file from the request body
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    // return 400 status if input file path is not provided, this is necessary do deal with edge cases where I/O doesn't exist/work.
    // choose to do 2 if statments instead of || to make it discrete for user to know if input or output file path is missing.
    if (!inputFilePath) {
        res.status(400).json({ message: 'Bad Request: Missing input file path' });  // had to remove return as it was causing type error after adding : void
    }
    if (!outputFilePath) {
        res.status(400).json({ message: 'Bad Request: Missing output file path' });
    }

    ffmpeg(inputFilePath)
        .outputOptions("-vf", "scale=-1:360") // output 360p quality
        .on("end", () => {
            res.status(200).send('Success: Video processing completed successfully');
        })
        .on("error", (err) => {
            console.log(`An error occurred: ${err.message}`);
            res.status(500).send(`Internal Server Error: ${err.message}`);
        })
        .save(outputFilePath);
});

/*app.get('/', (req, res) => {
    res.send('<h2>Hello, World!</h2><p>This is the video processing service</p>');
}); gets http endpoint */

const port = process.env.PORT || 3000; // standard technique process.env.PORT won't run on local machine so default to 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
