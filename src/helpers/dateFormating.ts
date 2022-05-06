export default function formatDate(date: string): string {
    let dateString = '';
    const dateInMiliseconds = Date.parse(date);
    const dateObj = new Date(dateInMiliseconds);
    dateString = `${dateObj.getFullYear()}-${
        dateObj.getMonth() + 1
    }-${dateObj.getDate()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;
    return dateString;
}
