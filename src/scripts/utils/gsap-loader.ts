export class GSAPLoader {
  private static instance: GSAPLoader;
  private gsapLoaded: boolean = false;
  private loadingPromise: Promise<void> | null = null;

  public static getInstance(): GSAPLoader {
    if (!GSAPLoader.instance) {
      GSAPLoader.instance = new GSAPLoader();
    }
    return GSAPLoader.instance;
  }

  public async loadGSAP(): Promise<void> {
    if (this.gsapLoaded) {
      return Promise.resolve();
    }

    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = new Promise((resolve, reject) => {
      // Check if GSAP is already loaded
      if (typeof window.gsap !== 'undefined') {
        this.gsapLoaded = true;
        resolve();
        return;
      }

      // Load GSAP from CDN
      const script1 = document.createElement('script');
      script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script1.async = true;

      const script2 = document.createElement('script');
      script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js';
      script2.async = true;

      let scriptsLoaded = 0;
      const totalScripts = 2;

      const onScriptLoad = () => {
        scriptsLoaded++;
        if (scriptsLoaded === totalScripts) {
          this.gsapLoaded = true;
          resolve();
        }
      };

      const onScriptError = () => {
        reject(new Error('Failed to load GSAP'));
      };

      script1.onload = onScriptLoad;
      script1.onerror = onScriptError;
      script2.onload = onScriptLoad;
      script2.onerror = onScriptError;

      document.head.appendChild(script1);
      document.head.appendChild(script2);
    });

    return this.loadingPromise;
  }

  public waitForGSAP(callback: () => void): void {
    if (typeof window.gsap !== 'undefined') {
      callback();
    } else {
      setTimeout(() => this.waitForGSAP(callback), 100);
    }
  }
}