interface MapProps {
  start: { date: string };
  summary: String;
}

/**
 * Class
 * GoogleCalendarAPI
 */
class GoogleCalendarAPI {
  /**
   * start ただプロミスしただけ...
   * @param {string} path
   * @returns {Promise<any>}
   */
  public static start = (path: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        window.gapi.load('client', () => {
          window.gapi.client
            .init({ apiKey: process.env.REACT_APP_G_CALENDAR_API_KEY })
            .then(() => {
              return gapi.client.request({ path: path }).then((res) => {
                const result = res.result.items.map((e: MapProps) => ({
                  date: e.start.date,
                  summary: e.summary,
                }));
                resolve(result);
              });
            })
            .catch(() => {
              const msg = 'Failed to connected Google Calendar API';
              reject(msg);
            });
        });
      } else {
        const msg = 'Failed to connected Internet';
        reject(msg);
      }
    });
  };
}

export default GoogleCalendarAPI;
