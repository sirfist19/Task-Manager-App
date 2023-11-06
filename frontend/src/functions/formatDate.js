export const formatDate = (nonformatedDateStr) => {
    // Convert the date string into a Date object
    const date = new Date(nonformatedDateStr);

    // Options for formatting
    const options = {
    weekday: 'short', // Short day of the week (e.g., "Wed")
    year: 'numeric',   // Full year (e.g., "2023")
    month: 'short',    // Short month name (e.g., "Oct")
    day: 'numeric',    // Day of the month (e.g., "25")
    hour: 'numeric',   // Hour (e.g., "12")
    minute: '2-digit', // Minutes (e.g., "00")
    };

    // Format the date
    const formattedDate = date.toLocaleString('en-US', options);

    //console.log(formattedDate); // Output: "Wed, Oct 25, 2023, 12:00 AM"
    return formattedDate;
};