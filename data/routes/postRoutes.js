const express = require('express');

const dbHelpers = require('../db');

const router = express.Router();

/*            GET ALL POSTS             */
router.get('/', (req, res) => {
    dbHelpers
        .find()
        .then((posts) => {
            res.status(200).send(posts);
        })
        .catch((err) => {
            res.status(500).json({errorMessage: "There was an issue retrieving the post data."})
        })
});

/*            GET SPECIFIC POST           */

router.get('/:id/', (req, res) => {
    const id = req.params;
    console.log(id);
    dbHelpers.findById(id.id)
        .then(post => {
            console.log(post);
            res.status(200).send(post);
        })
        .catch(err => {
            res.status(404).json({errorMessage: "The post with specified ID does not exist."})
        });
})

/*            GET ALL COMMENTS ON POST              */

router.get('/:id/comments/', (req, res) => {
    const id = req.params;
    dbHelpers.findPostComments(id)
        .then(comments => {
            res.status(200).send(comments);
        })
        .catch(err => {
            res.status(404).json({errorMessage: "The post with the specified ID does not exist"})
        });
});

/*            ADD NEW POST              */
router.post('/', (req, res) => {
    const newItem = req.body;
    console.log(newItem);
    if (newItem.title && newItem.contents){
        dbHelpers.insert(newItem)
            .then(id => {
                console.log(id.id);
                dbHelpers.findById(id.id)
                    .then(post => {
                        if (post){
                            res.status(201).send(post);
                        } else {
                            console.log("Fail 1")
                            res.status(500).json({errorMessage: "There was an issue grabbing the new post."})
                        }
                    })
                    .catch(err => {
                        console.log("Fail 2")
                        res.status(500).json({errorMessage: "There was an issue grabbing the new post"})
                    })
            })
            .catch(err => {
                res.status(500).json({errorMessage: "There was an error while saving the post to the database!"})
            })
    } else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post"});
    }
});

/*            ADD NEW COMMENT ON POST              */



// exports
module.exports = router;