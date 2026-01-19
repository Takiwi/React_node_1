import not_found from "../assets/images/not_found.gif";

export default function NotFound() {
  return (
    <>
      <div className="flex justify-center items-center flex-col gap-3 h-screen">
        <h1 className="text-4xl font-bold">
          404 <br /> Not Found!
        </h1>

        <div>
          <img src={not_found} alt="Not found!" className="rounded-xl" />
        </div>
      </div>
    </>
  );
}
