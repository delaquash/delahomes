
function CreateListing() {
    return (
      <main className="p-3 max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">
          Create a Listing
        </h1>
        <form className="flex flex-col gap-4 flex-1 outline-none">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg outline-none"
              id="name"
              maxLength={62}
              minLength={10}
              required
              // onChange={handleChange}
              // value={formData.name}
            />
            <textarea
              placeholder="Description"
              className="border p-3 rounded-lg outline-none"
              id="description"
              required
              // onChange={handleChange}
              // value={formData.description}
            />
            <input
              type="text"
              placeholder="Address"
              className="border p-3 rounded-lg outline-none"
              id="address"
              required
              // onChange={handleChange}
              // value={formData.address}
            />
            <div className="flex flex-wrap gap-6">
              <div className="flex gap-2">
                <input type="checkbox" id="sale" className="w-5" />
                <span>Sell</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  // onChange={handleChange}
                  // checked={formData.type === 'rent'}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="parking"
                  className="w-5"
                  // onChange={handleChange}
                  // checked={formData.parking}
                />
                <span>Parking spot</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="furnished"
                  className="w-5"
                  // onChange={handleChange}
                  // checked={formData.furnished}
                />
                <span>Furnished</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  // onChange={handleChange}
                  // checked={formData.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bedrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  // value={formData.bedrooms}
                />
                <p>Beds</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="bathrooms"
                  min="1"
                  max="10"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  // value={formData.bathrooms}
                />
                <p>Baths</p>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="regularPrice"
                  min="50"
                  max="10000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  // onChange={handleChange}
                  // value={formData.regularPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Regular price</p>
                  {/* {formData.type === 'rent' && (
                  <span className='text-xs'>($ / month)</span>
                )} */}
                </div>
              </div>
            </div>
          </div>
          
        </form>
      </main>
    );
}

export default CreateListing