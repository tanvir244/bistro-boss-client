import SectionTitle from "../../../Components/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import './Featured.css';

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white my-20 pt-8">
            <SectionTitle
                subHeading={"Check it out"}
                heading={"Featured items"}
            ></SectionTitle>
            <div className="md:flex justify-center items-center bg-slate-500 opacity-60 pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">Where can I get some ?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus amet autem quam dolores nihil officia laborum consectetur quo ex id ducimus error ipsum hic odit voluptatum reprehenderit, provident aspernatur necessitatibus!</p>
                    <button className="btn btn-outline border-0 border-b-4 text-white">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;