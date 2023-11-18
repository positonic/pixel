import { useRouter } from "next/router";

// import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

function EditProfile({ address }: { address: string }) {
  const router = useRouter();

  return (
    <section className="flex flex-col gap-4 mb-4 max-w-md mx-auto px-5">
      <p className="text-center opacity-40">Address: {address}</p>
      <button
        className="btn btn-primary rounded-full capitalize font-normal  mx-auto custom-button "
        onClick={() => router.push("/register")}
      >
        REGISTER PROFILE
      </button>
    </section>
  );
}

export default EditProfile;
