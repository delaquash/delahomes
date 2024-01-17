import { useState } from "react";

interface SideBarDataProps {
  searchTerm: string;
  type: string;
  parking: boolean;
  furnished: boolean;
  offer: false;
  sort: string;
  order: string
}

const Search = ()=> {
  const [sideBarData, setSideBarData] = useState<SideBarDataProps>({
    searchTerm : "",
    type:"all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc"
})

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  if (
    e.target.id === "all" ||
    e.target.id === "rent" ||
    e.target.id === "sale"
  ) {
    setSideBarData({ ...sideBarData, type: e.target.id });
  }

  if (e.target.id === "searchTerm") {
    setSideBarData({ ...sideBarData, searchTerm: e.target.value });
  }

  if (
    e.target.id === "parking" ||
    e.target.id === "furnished" ||
    e.target.id === "offer"
  ) {
    setSideBarData({
      ...sideBarData,
      [e.target.id]:
        (e.target as HTMLInputElement).checked ||
        (e.target as HTMLInputElement).checked === true
          ? true
          : false,
    });
  }

  if (e.target.id === 'sort_order') {
    const sort = e.target.value.split('_')[0] || 'created_at';
    const order = e.target.value.split('_')[1] || 'desc';
    setSideBarData({ ...sideBarData, sort, order });
  }
};

const handleSubmit = (e: { preventDefault: () => void; }) => {
  e.preventDefault();
  const urlParams = new URLSearchParams()
  urlParams.set("searchTerm", sideBarData.searchTerm);
  urlParams.set("type", sideBarData.type);
  urlParams.set("parking", String(sideBarData.parking));
  urlParams.set("furnished", String(sideBarData.furnished));
  urlParams.set("parking", String(sideBarData.offer));
  urlParams.set("sort", sideBarData.sort);
  urlParams.set("type", sideBarData.type);
  const searchQuery = urlParams.toString()
}




  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="order rounded-lg p-3 w-full"
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
              <div className="flex gap-2">
                  <input
                      type="checkbox"
                      id="all"
                      className="w-5"
                      onChange={handleChange}
                  />
                  <span>Rent & Sale</span>
                </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5"
                  onChange={handleChange}
                  checked={sideBarData.type === 'rent'}
                />
                <span>Rent</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="sale"
                  className="w-5"
                  onChange={handleChange}
                  checked={sideBarData.type === 'sale'}
                />
                <span>Sale</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  id="offer"
                  className="w-5"
                  onChange={handleChange}
                  checked={sideBarData.offer}
                />
                <span>Offer</span>
                </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
            <label className='font-semibold'>Amenities:</label>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData.parking}
              />
              <span>Parking</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                onChange={handleChange}
                checked={sideBarData.furnished}
              />
              <span>Furnished</span>
            </div>
            </div>
            <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order'
              className='border rounded-lg p-3'
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          
            </div>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
        </div>
        <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>
          Listing results:
        </h1>
        <div className='p-7 flex flex-wrap gap-4'>
          {/* {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-700'>No listing found!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>
          )} */}

          {/* {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-700 hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Search;
