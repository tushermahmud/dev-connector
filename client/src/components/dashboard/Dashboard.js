import React,{Fragment, useEffect} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {getCurrentProfile} from '../../actions/profile'
import Spinner from '../layouts/Spinner'
const Dashboard = ({getCurrentProfile,profile:{profile,loading},auth}) => {
    useEffect(() => {
        getCurrentProfile()
    }, [])
    return loading && profile==null?(<Spinner/>):(
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">        
            <i className="fas fa-user">Welcome {auth && auth.user.name}</i>
        </p>
        {profile!==null ? 
            (<Fragment>has</Fragment>)
            :
            (<Fragment>
                There is no profile setup yet. Please add some info.
                <p>
                <Link to="create-profile" className="btn btn-primary my-1">Create Profile</Link>
                </p>
            </Fragment>)}

    </Fragment>
    );
}
const mapStateToProps =state => ({
    auth:state.auth,
    profile: state.profile
})
export default connect(mapStateToProps,{getCurrentProfile})(Dashboard)
