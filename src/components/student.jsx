import axios from 'axios';
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import "./student.css"
function Student() {

    const [studentid, setId] = useState('');
    const [studentname, setName] = useState("");
    const [studentaddress, setAddress] = useState("");
    const [mobile, setMobile] = useState("");
    const [students, setUsers] = useState([]);
    const [query, setQuery] = useState("")



    useEffect(() => {
        (async () => await Load())()
    }, []);
    
    async function Load() {
        const result = await axios.get(
            "http://localhost:8089/api/v1/student/pagination/0/5"
            );
        setUsers(result.data.content);
    }
    async function save(event) {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8089/api/v1/student/save",
                {
                    studentname: studentname,
                    studentaddress: studentaddress,
                    mobile: mobile
                });
            alert("Profile Successfully Created");
            setId("");
            setName("");
            setAddress("");
            setMobile("");
            Load();
        }
        catch (err) {
            alert("Profile Creation Failed");
        }
    }

    async function editStudent(students) {
        setName(students.studentname);
        setAddress(students.studentaddress);
        setMobile(students.mobile);
        setId(students._id);
    }
    async function DeleteStudent(studentid) {
        await axios.delete("http://localhost:8089/api/v1/student/delete/" + studentid);
        alert("Profile deleted Successfully");
        Load();
    }
    async function update(event) {
        event.preventDefault();
        try {
            await axios.put("http://localhost:8089/api/v1/student/edit/" + studentid,
                {
                    studentname: studentname,
                    studentaddress: studentaddress,
                    mobile: mobile
                });
            alert("Profile Updated");
            setId("");
            setName("");
            setAddress("");
            setMobile("");
            Load();
        }
        catch (err) {
            alert("Profile Update Failed");
        }
    }

    const fetchComments = async (currentPage) => {
        const res = await axios.get(
            `http://localhost:8089/api/v1/student/pagination/${currentPage}/5`,{
               
            }
        );
        const results = await res.data.content;
        return results;
    }

    const handlePageClick = async (data) => {
        let currentPage = data.selected + 1

        const studentfromServer = await fetchComments(currentPage);

        setUsers(studentfromServer)
    }

    return (
        <div> 
            <h1>Student Profile Form</h1>
            <div className="container mt-4" >
                <form>
                    <div className="form-group">
                        <label>Student Name</label>
                        <input type="text" className="form-control" id="studentname"
                            value={studentname}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Student Address</label>
                        <input type="text" className="form-control" id="studentaddress"
                            value={studentaddress}
                            onChange={(event) => {
                                setAddress(event.target.value);
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Mobile</label>
                        <input type="text" className="form-control" id="mobile"
                            value={mobile}
                            onChange={(event) => {
                                setMobile(event.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <button className="btn btn-primary mr-2" onClick={save}>Create Profile</button>

                        <button className="btn btn-warning m-2" onClick={update}>Update Profile</button>
                    </div>
                </form>
            </div>
            <br />
            
            <table className="table table-dark" align="center">
                <thead>
                    <tr>
                        <th scope="col">Student Name</th>
                        <th scope="col">Student Address</th>
                        <th scope="col">Student Mobile</th>
                        <th scope="col">Option</th>
                        <th scope="col">
                           Search <input type='text' onChange={e=> setQuery(e.target.value)}/>
                        </th>
                        
                    </tr>
                </thead>
                {students.filter((student)=>student.studentname.toLowerCase().includes(query)
                ).map(function fn(student) {
                    return (
                        <tbody className='container' key={student._id}>
                            <tr>
                                <td>{student.studentname}</td>
                                <td>{student.studentaddress}</td>
                                <td>{student.mobile}</td>
                                <td>
                                    <button type="button" className="btn btn-warning mr-2" onClick={() => editStudent(student)} >Edit Profile</button>
                                    <button type="button" className="btn btn-danger" onClick={() => DeleteStudent(student._id)}>Delete Profile</button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={5}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default Student;