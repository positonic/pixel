import Link from "next/link";

function ViewCollections() {
  return (
    <section className="flex flex-col gap-2 mb-4 max-w-md mx-auto px-5">
      <div className="max-w-screen-xl mx-auto px-4">
        <h1 className="text-3xl mb-4 mt-10">Vouched Collections</h1>

        <div className="grid grid-cols-2 gap-4 p-5">
          <div className="flex flex-col items-center">
            <Link href="/tokens/bayc">
              <img src="tokens/bayc.png" alt="Image 1" className="w-32 h-32 object-cover mb-2" />
              <p className="text-md">Bored Ape Yacht Club</p>
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <Link href="/tokens/nouns">
              <img src="tokens/noun.png" alt="Image 2" className="w-32 h-32 object-cover mb-2" />
              <p className="text-md">Nouns</p>
            </Link>
          </div>
          {/* 
    <div class="flex flex-col items-center">
      <img src="image3.jpg" alt="Image 3" class="w-64 h-64 object-cover mb-2" />
      <p class="text-md">Description for Image 3</p>
    </div> */}
        </div>
      </div>

      <button className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button " disabled={true}>
        + EXPLORE
      </button>
    </section>
  );
}

export default ViewCollections;
