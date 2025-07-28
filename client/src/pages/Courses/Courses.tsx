import Header from "@/components/Header/Header";
import "./Courses.css"
import { FiSearch } from 'react-icons/fi';
import { useEffect, useState } from "react";
import axios from "axios";
import type { Profession } from "@/types/Professions";
import Footer from "@/components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const Courses = () => {
    const [professions, setProfessions] = useState<Profession[]>();
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfessions = async () => {
            try {
                const response = await axios.get("http://localhost:3000/profession/findAll");
                setProfessions(response.data);
            } catch (e: any) {
                console.error("Error fetching professions", e);
            }
        };
        fetchProfessions();
    }, []);

    const filteredProfessions = professions?.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="courses">
            <Header />
            <h2 className="courses__title">All Programs</h2>
            <div className="courses__content">
                <nav className="courses__sidebar">
                    <div className="search-container">
                        <FiSearch className="search-icon" />
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </nav>
                <ul className="courses__list">
                    {filteredProfessions && filteredProfessions.map((profession) => (
                        <li
                            key={profession.id}
                            className="courses__item"
                            style={{ backgroundImage: `url(/${profession.image})` }}
                            onClick={() => navigate(`/profession/${profession.id}`)}
                        >
                            <span className="courses__item__type">Profession</span>
                            <div className="courses__item__blur" />
                            <div>
                                <h3 className="courses__item__title">{profession.title}</h3>
                                <p className="courses__item__descr">{profession.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
};

export default Courses;
