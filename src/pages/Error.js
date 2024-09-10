import {Link, useRouteError} from 'react-router-dom';

function ErrorPage(){
    const error = useRouteError();
    let title ='An error occurred!';
    let message = 'something went wrong!';


    if(error.status === 500){
        message = error.data.message;
    }
    if(error.status === 404){
        title = 'Page Not Found!';
        message = 'Could not find resource or page';
    }
    return (
        <div style = {{textAlign: 'center'}}>
            <h1>{title}</h1>
            <p>{message}</p>
            <Link to= '..'>Go back</Link>
        </div>
    )
}

export default ErrorPage;