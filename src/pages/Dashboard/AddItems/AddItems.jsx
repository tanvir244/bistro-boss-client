import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        
        // image upload to imgbb and then get an url 
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if(res.data.success) {
            // now send the menu item data to the server with the image url 
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuItem);
            console.log(menuRes.data);
            if(menuRes.data.insertedId){
                // show success popup
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} added to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }

        console.log('with image url', res.data);
    };

    return (
        <div>
            <SectionTitle heading="add an item" subHeading="what's new"></SectionTitle>
            <div className="w-[70%] mx-auto p-10 bg-[#F1BB50] my-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Recipe Name*</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register('name', {required: true})}
                            className="input input-bordered w-full" />
                    </label>

                    <div className="flex gap-6">
                        {/* category */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text font-semibold">Category*</span>
                            </div>
                            <select defaultValue="default" {...register("category", {required: true})}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </label>

                        {/* price */}
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text font-semibold">Price*</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', {required: true})}
                                className="input input-bordered w-full" />
                        </label>
                    </div>

                    {/* recipe details */}
                    <div>
                        <div className="label">
                            <span className="label-text font-semibold">Recipe Details*</span>
                        </div>
                        <textarea {...register('recipe', {required: true})} placeholder="Bio" className="textarea textarea-bordered textarea-lg w-full" ></textarea>
                    </div>

                    <div className="my-6">
                        <input {...register('image', {required: true})} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn w-48">
                        Add Items <FaUtensils></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;