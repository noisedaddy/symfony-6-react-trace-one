import React,{ useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import Swal from 'sweetalert2'
import axios from 'axios';

function articleList() {
    const  [articleList, setArticleList] = useState([])

    useEffect(() => {
        fetchArticleList()
    }, [])

    const fetchArticleList = () => {
        axios.get('/api/article')
            .then(function (response) {
                setArticleList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/article/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'article deleted successfully!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        fetchArticleList()
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'An Error Occured!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    });
            }
        })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">article Manager</h2>
                <div className="card">
                    <div className="card-header">
                        <Link
                            className="btn btn-outline-primary"
                            to="/create">Create New Article
                        </Link>
                    </div>
                    <div className="card-body">

                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th width="240px">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {articleList.map((article, key)=>{
                                return (
                                    <tr key={key}>
                                        <td>{article.title}</td>
                                        <td>{article.description}</td>
                                        <td>
                                            <Link
                                                to={`/show/${article.id}`}
                                                className="btn btn-outline-info mx-1">
                                                Show
                                            </Link>
                                            <Link
                                                className="btn btn-outline-success mx-1"
                                                to={`/edit/${article.id}`}>
                                                Edit
                                            </Link>
                                            <button
                                                onClick={()=>handleDelete(article.id)}
                                                className="btn btn-outline-danger mx-1">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default articleList;