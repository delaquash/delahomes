
function CreateListing() {
    return (
      <main>
        <h1 className="text-3xl font-semibold text-center my-7">
          Create a Listing
        </h1>
        <form className="flex flex-col sm:flex-auto">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength={62}
            minLength={10}
            required
            // onChange={handleChange}
            // value={formData.name}
          />
          <textarea
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            // onChange={handleChange}
            // value={formData.description}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
            // onChange={handleChange}
            // value={formData.address}
          />
        </form>
      </main>
    );
}

export default CreateListing