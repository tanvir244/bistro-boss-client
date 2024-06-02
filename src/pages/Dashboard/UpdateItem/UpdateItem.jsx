import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle";
// import { register } from "swiper/element";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {name, category, recipe, price, _id} = useLoaderData();

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
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data);
            if(menuRes.data.modifiedCount > 0){
                // show success popup
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.name} updated to the menu`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }

        console.log('with image url', res.data);
    };

    return (
        <div>
            <SectionTitle heading="Update an item" subHeading="Refreash Info"></SectionTitle>
            <div className="w-[70%] mx-auto p-10 bg-[#F1BB50] my-12">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text font-semibold">Recipe Name*</span>
                        </div>
                        <input
                            type="text"
                            defaultValue={name}
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
                            <select defaultValue={category} {...register("category", {required: true})}
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
                                defaultValue={price}
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
                        <textarea defaultValue={recipe} {...register('recipe', {required: true})} placeholder="Bio" className="textarea textarea-bordered textarea-lg w-full" ></textarea>
                    </div>

                    <div className="my-6">
                        <input {...register('image', {required: true})} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn w-48">
                        Update menu items
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;