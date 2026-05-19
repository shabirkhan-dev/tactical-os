#include "../src/message.h"
#include <assert.h>
#include <string.h>

int main(void) {
    assert(strcmp(school_os_message(), "Hello from School OS C app") == 0);
    return 0;
}

