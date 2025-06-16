import toast from "react-hot-toast";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import Swal from "sweetalert2";

const BlogTableItem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);
  const { axios } = useAppContext();
  const deleteBlog = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to delete this blog?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#5044E5",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      const { data } = await axios.post(`/api/blog/delete`, { id: blog._id });
      if (data.success) {
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
        toast.success(data.message);
        await fetchBlogs(); // Refresh blog list
      } else {
        Swal.fire("Error", "Failed to delete blog.", "error");
        toast.error(data.message);
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong.", "error");
      toast.error(error.message);
    }
  } else {
    Swal.fire("Cancelled", "Your blog is safe.", "info");
  }

  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post(`/api/blog/toggle-publish`, {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py-4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-4 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-600" : "text-orange-700"
          }`}
        >
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
        <button
          onClick={togglePublish}
          className="border px-2 py-0.5 mt-1 rounded cursor-pointer"
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          onClick={deleteBlog}
          src={assets.cross_icon}
          alt="cross_icon"
          className="w-8 hover:scale-110 transition-all cursor-pointer"
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;
