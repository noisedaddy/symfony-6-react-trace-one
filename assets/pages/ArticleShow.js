import React, {useState, useEffect} from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout"
import axios from 'axios';

function ArticleShow() {
    const [id, setId] = useState(useParams().id)
    const [article, setArticle] = useState({name:'', description:''})
    useEffect(() => {
        axios.get(`/api/article/${id}`)
            .then(function (response) {
                setArticle(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Show Article</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-info float-right"
                            to="/"> View All Articles
                        </Link>
                    </div>
                    <div className="card-body">
                        <b className="text-muted">Name:</b>
                        <p>{article.title}</p>
                        <b className="text-muted">Description:</b>
                        <p>{article.description}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default ArticleShow;