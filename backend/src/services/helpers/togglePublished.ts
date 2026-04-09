import mongoose from 'mongoose';

const togglePublishedHelper = async <T>(
  model: mongoose.Model<T>,
  id: string,
) => {
  const updatedData = await model.findByIdAndUpdate(
    id,
    [
      {
        $set: {
          isPublished: { $not: '$isPublished' },
        },
      },
    ],
    {
      updatePipeline: true,
      returnDocument: 'after',
    },
  );

  return updatedData;
};

export default togglePublishedHelper;
