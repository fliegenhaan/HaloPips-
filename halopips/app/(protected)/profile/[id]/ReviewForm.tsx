"use client"
import { useState } from "react";
import { updateReview } from "@/action/giveReview";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const ReviewForm = ({ id }: { id: string }) => {
  const [review, setReview] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleUpdateReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("review", review);

    try {
      const result = await updateReview(formData, id);
      setMessage(result.message);
      setIsError(false);
    } catch (error) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("An unknown error occurred");
      }
      setIsError(true);
    }
  };

  return (
    <div className="p-2">
      <form onSubmit={handleUpdateReview}>
        <Label className="font-bold text-xl text-pips-600" htmlFor="review">
          Leave a Review
        </Label>
        <Input
          id="review"
          placeholder="Write your review..."
          type="text"
          name="review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="rounded-xl bg-white w-96 h-12 text-lg text-pips-500"
          required
        />
        <Button type="submit" className="mt-4 text-pips-100">Submit Review</Button>
      </form>
      {message && (
        <p className={`mt-4 ${isError ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ReviewForm;